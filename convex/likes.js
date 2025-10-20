import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const toggleLike = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);

    if (!post || post.status !== "published") {
      throw new Error("Post not found or not published");
    }

    const user = await ctx.runQuery(internal.users.getCurrentUser);
    let userId = user?._id;

    // Check if already liked
    const existingLike = await ctx.db
      .query("likes")
      .filter((q) =>
        q.and(
          q.eq(q.field("postId"), args.postId),
          q.eq(q.field("userId"), userId)
        )
      )
      .unique();

    if (existingLike) {
      // Unlike - remove the like
      await ctx.db.delete(existingLike._id);

      // Decrement like count on post
      await ctx.db.patch(args.postId, {
        likeCount: Math.max(0, post.likeCount - 1),
      });
      return { liked: false, likeCount: Math.max(0, post.likeCount - 1) };
    } else {
      // Like - add a new like
      await ctx.db.insert("likes", {
        postId: args.postId,
        userId: userId,
        createdAt: Date.now(),
      });

      // Increment like count on post
      await ctx.db.patch(args.postId, {
        likeCount: post.likeCount + 1,
      });

      return { liked: true, likeCount: post.likeCount + 1 };
    }
  },
});

// Check if user has liked a post
export const hasUserLiked = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);
    const userId = user?._id;

    const like = await ctx.db
      .query("likes")
      .filter((q) =>
        q.and(
          q.eq(q.field("postId"), args.postId),
          q.eq(q.field("userId"), userId)
        )
      )
      .unique();

    return !!like;
  },
});
