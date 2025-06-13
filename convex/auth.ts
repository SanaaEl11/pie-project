import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password, Anonymous],
});

export const createUser = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    try {
      // Only check for existing user if email is provided
      if (args.email) {
        const existingUser = await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", args.email))
          .first();

        if (existingUser) {
          throw new Error("User with this email already exists");
        }
      }

      // Create user in the database
      const user = await ctx.db.insert("users", {
        name: args.isAnonymous ? "Anonymous User" : args.name,
        email: args.email,
        createdAt: new Date().toISOString(),
        isAnonymous: args.isAnonymous ?? false,
        role: args.role ?? "player", // Default to player if not specified
      });

      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
});

export const loggedInUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    
    // Get user from our users table
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", userId))
      .first();
      
    if (!user) {
      return null;
    }
    return user;
  },
});
