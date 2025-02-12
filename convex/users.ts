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
