import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


//function to save the user to the database
export const syncUser = mutation({
  // Taking all the properties of the user
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the user already exists in the database
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    // If the user does not exist, insert it into the database
    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        isPro: false,
      });
    }
  },
});

export const getUser = query({
    args: { userId: v.string() },
  
    handler: async (ctx, args) => {
      if (!args.userId) return null;
  
      const user = await ctx.db
        .query("users")
        .withIndex("by_user_id")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first();
  
      if (!user) return null;
  
      return user;
    },
  });

  export const upgradeToPro = mutation({
    args: {
      email: v.string(),
      lemonSqueezyCustomerId: v.string(),
      lemonSqueezyOrderId: v.string(),
      amount: v.number(),
    },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .first();
  
      if (!user) throw new Error("User not found");
  
      await ctx.db.patch(user._id, {
        isPro: true,
        proSince: Date.now(),
        lemonSqueezyCustomerId: args.lemonSqueezyCustomerId,
        lemonSqueezyOrderId: args.lemonSqueezyOrderId,
      });
  
      return { success: true };
    },
  });