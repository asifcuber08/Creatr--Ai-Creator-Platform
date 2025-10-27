import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Basic user info from Clerk
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(), // Clerk user ID for auth
    imageUrl: v.optional(v.string()), // Profile picture
    username: v.optional(v.string()), // Unique username for public profiles

    // Activity timestamps
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_token", ["tokenIdentifier"]) // Primary auth lookup
    .index("by_email", ["email"]) // Email lookups
    .index("by_username", ["username"]) // Username lookup for public profiles
    .searchIndex("search_name", { searchField: "name" }) // User search
    .searchIndex("search_email", { searchField: "email" }),

  posts: defineTable({
    title: v.string(),
    content: v.string(),
    status: v.union(v.literal("draft"), v.literal("published")),

    // Author relationship
    authorId: v.id("users"),

    // Content metadata
    tags: v.array(v.string()),
    categoryImage: v.optional(v.string()),
    featuredImage: v.optional(v.string()),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
    publishedAt: v.optional(v.number()),
    scheduledFor: v.optional(v.number()), // For scheduled publishing

    // Analytics
    viewCount: v.number(),
    likeCount: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_status", ["status"])
    .index("by_publishedAt", ["status", "publishedAt"])
    .index("by_author_status", ["authorId", "status"])
    .searchIndex("search_content", { searchField: "title" }),

  comments: defineTable({
    postId: v.id("posts"),
    authorId: v.optional(v.id("users")), // Optional for anonymous comments
    authorName: v.string(), // Name to display for the author
    authorEmail: v.optional(v.string()), // Email for notifications

    content: v.string(),
    status: v.union(
      v.literal("approved"),
      v.literal("pending"),
      v.literal("rejected")
    ),

    createdAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_post_status", ["postId", "status"])
    .index("by_author", ["authorId"]),

    likes: defineTable({
    postId: v.id("posts"),
    userId: v.optional(v.id("users")), // Optional for anonymous likes

    createdAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_user", ["userId"])
    .index("by_post_user", ["postId", "userId"]), // To prevent duplicate likes

    follows: defineTable({
    followerId: v.id("users"),
    followingId: v.id("users"),

    createdAt: v.number(),
  })
    .index("by_follower", ["followerId"])
    .index("by_following", ["followingId"])
    .index("by_relationship", ["followerId", "followingId"]), // To prevent duplicate follows

    dailyStats: defineTable({
      postId: v.id("posts"),
      date: v.string(), // YYYY-MM-DD format
      views: v.number(),

      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_post", ["postId"])
      .index("by_date", ["date"])
      .index("by_post_date", ["postId", "date"]), // For daily stats lookup
}); 
