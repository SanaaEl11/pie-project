import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    role: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
  }).index("by_email", ["email"]),

  competitions: defineTable({
    name: v.string(),
    code: v.string(),
    numPlayers: v.number(),
    currentQuestion: v.number(),
    status: v.union(v.literal("waiting"), v.literal("active"), v.literal("finished")),
    currentBuzzer: v.optional(v.id("players")),
    timePerQuestion: v.number(),
    isPaid: v.boolean(),
  }).index("by_code", ["code"]),

  players: defineTable({
    competitionId: v.id("competitions"),
    name: v.string(),
    score: v.number(),
    hasBuzzed: v.boolean(),
  }).index("by_competition", ["competitionId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
