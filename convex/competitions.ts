import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const createCompetition = mutation({
  args: {
    name: v.string(),
    numPlayers: v.number(),
    timePerQuestion: v.number(),
  },
  handler: async (ctx, args) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const isPaid = args.numPlayers > 10;
    
    await ctx.db.insert("competitions", {
      name: args.name,
      code,
      numPlayers: args.numPlayers,
      currentQuestion: 1,
      status: "waiting",
      timePerQuestion: args.timePerQuestion,
      isPaid,
    });
    
    return code;
  },
});

export const joinCompetition = mutation({
  args: {
    code: v.string(),
    playerName: v.string(),
  },
  handler: async (ctx, args) => {
    const competition = await ctx.db
      .query("competitions")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .unique();
    
    if (!competition) {
      throw new Error("Competition not found");
    }

    const existingPlayers = await ctx.db
      .query("players")
      .withIndex("by_competition", (q) => q.eq("competitionId", competition._id))
      .collect();

    if (existingPlayers.length >= competition.numPlayers) {
      throw new Error("Competition is full");
    }

    return await ctx.db.insert("players", {
      competitionId: competition._id,
      name: args.playerName,
      score: 0,
      hasBuzzed: false,
    });
  },
});

export const getCompetition = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("competitions")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .unique();
  },
});

export const getPlayers = query({
  args: { competitionId: v.id("competitions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("players")
      .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId))
      .collect();
  },
});

export const buzz = mutation({
  args: { playerId: v.id("players") },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return;

    const competition = await ctx.db.get(player.competitionId);
    if (!competition || competition.status !== "active") return;

    if (!competition.currentBuzzer) {
      await ctx.db.patch(competition._id, { currentBuzzer: args.playerId });
      await ctx.db.patch(args.playerId, { hasBuzzed: true });
    }
  },
});

export const updateScore = mutation({
  args: { 
    playerId: v.id("players"),
    correct: v.boolean(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return;

    const competition = await ctx.db.get(player.competitionId);
    if (!competition) return;

    if (args.correct) {
      await ctx.db.patch(args.playerId, { 
        score: player.score + 1,
        hasBuzzed: false,
      });
    } else {
      await ctx.db.patch(args.playerId, { hasBuzzed: false });
    }

    await ctx.db.patch(competition._id, {
      currentBuzzer: undefined,
      currentQuestion: competition.currentQuestion + 1,
    });
  },
});

export const startCompetition = mutation({
  args: { competitionId: v.id("competitions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.competitionId, { status: "active" });
  },
});

export const endCompetition = mutation({
  args: { competitionId: v.id("competitions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.competitionId, { status: "finished" });
  },
});
