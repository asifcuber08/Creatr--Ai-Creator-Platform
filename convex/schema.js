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
});
