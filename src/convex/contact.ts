import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const saveMessage = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    status: v.string(),
    providerMessageId: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contact_messages", {
      name: args.name,
      email: args.email,
      message: args.message,
      sentAt: Date.now(),
      status: args.status,
      providerMessageId: args.providerMessageId,
      error: args.error,
    });
  },
});
