import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const toggleFollow = mutation({
  args: { followingId: v.id("users") },
  handler: async (ctx, args) => {
    const follower = await ctx.runQuery(internal.users.getCurrentUser);

    // Can't follow yourself
    if (follower._id === args.followingId) {
      throw new Error("You cannot follow yourself.");
    }

    // Check if already following
    const existingFollow = await ctx.db
      .query("follows")
      .filter((q) =>
        q.and(
          q.eq(q.field("followerId"), follower._id),
          q.eq(q.field("followingId"), args.followingId)
        )
      )
      .unique();

    if (existingFollow) {
      // Unfollow
      await ctx.db.delete(existingFollow._id);
      return { following: false };
    } else {
      // Follow
      await ctx.db.insert("follows", {
        followerId: follower._id,
        followingId: args.followingId,
        createdAt: Date.now(),
      });
      return { following: true };
    }
  },
});

// Check if current user is following a specific user
export const isFollowing = query({
  args: { followingId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const follower = await ctx.runQuery(internal.users.getCurrentUser);

    const follow = await ctx.db
      .query("follows")
      .filter((q) =>
        q.and(
          q.eq(q.field("followerId"), follower._id),
          q.eq(q.field("followingId"), args.followingId)
        )
      )
      .unique();

    return !!follow;
  },
});

// Get follower count for a user
export const getFollowerCount = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const follows = await ctx.db
      .query("follows")
      .filter((q) => q.eq(q.field("followingId"), args.userId))
      .collect();

    return follows.length;
  },
});


  //  added

export const getMyFollowers = query({
  handler: async (ctx) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);
    if (!user) return [];

    // Find all "follows" where others are following the current user
    const followers = await ctx.db
      .query("follows")
      .filter((q) => q.eq(q.field("followingId"), user._id))
      .order("desc")
      .collect();

    // Get follower user details
    const followerUsers = await Promise.all(
      followers.map(async (f) => {
        const followerUser = await ctx.db.get(f.followerId);
        if (!followerUser) return null;

        // Check if you (current user) follow them back
        const followBack = await ctx.db
          .query("follows")
          .filter((q) =>
            q.and(
              q.eq(q.field("followerId"), user._id),
              q.eq(q.field("followingId"), followerUser._id)
            )
          )
          .first();

        // Count their published posts (optional)
        const posts = await ctx.db
          .query("posts")
          .filter((q) =>
            q.and(
              q.eq(q.field("authorId"), followerUser._id),
              q.eq(q.field("status"), "published")
            )
          )
          .collect();

        return {
          _id: followerUser._id,
          name: followerUser.name,
          username: followerUser.username,
          imageUrl: followerUser.imageUrl,
          followedAt: f.createdAt,
          postCount: posts.length,
          isFollowedBack: !!followBack,
        };
      })
    );

    return followerUsers.filter(Boolean);
  },
});

export const getMyFollowing = query({
  handler: async (ctx) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);
    if (!user) return [];

    // Find all "follows" where the current user is following others
    const following = await ctx.db
      .query("follows")
      .filter((q) => q.eq(q.field("followerId"), user._id))
      .order("desc")
      .collect();

    // Get following user details
    const followingUsers = await Promise.all(
      following.map(async (f) => {
        const followingUser = await ctx.db.get(f.followingId);
        if (!followingUser) return null;

        // Check if that user follows you back
        const followsBack = await ctx.db
          .query("follows")
          .filter((q) =>
            q.and(
              q.eq(q.field("followerId"), followingUser._id),
              q.eq(q.field("followingId"), user._id)
            )
          )
          .first();

        // Get that user’s followers count (optional)
        const followersCount = await ctx.db
          .query("follows")
          .filter((q) => q.eq(q.field("followingId"), followingUser._id))
          .collect();

        return {
          _id: followingUser._id,
          name: followingUser.name,
          username: followingUser.username,
          imageUrl: followingUser.imageUrl,
          followedAt: f.createdAt,
          followersCount: followersCount.length,
          isFollowedBack: !!followsBack,
        };
      })
    );

    return followingUsers.filter(Boolean);
  },
});

