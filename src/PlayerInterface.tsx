import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../convex/_generated/dataModel";

export function PlayerInterface({ onBack }: { onBack: () => void }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [playerId, setPlayerId] = useState<Id<"players">>();

  const joinCompetition = useMutation(api.competitions.joinCompetition);
  const buzz = useMutation(api.competitions.buzz);
  
  const competition = useQuery(api.competitions.getCompetition, 
    code ? { code } : "skip"
  );
  const players = useQuery(api.competitions.getPlayers, 
    competition ? { competitionId: competition._id } : "skip"
  ) ?? [];

  const currentPlayer = players.find(p => p._id === playerId);
  const canBuzz = competition?.status === "active" && 
    currentPlayer && !currentPlayer.hasBuzzed;

  const handleJoin = async () => {
    try {
      const player = await joinCompetition({ code, playerName: name });
      setPlayerId(player);
      toast.success("Joined competition!");
    } catch (error) {
      toast.error("Failed to join competition");
    }
  };

  const handleBuzz = async () => {
    if (!playerId) return;
    try {
      await buzz({ playerId });
    } catch (error) {
      toast.error("Failed to buzz");
    }
  };

  if (!playerId) {
    return (
      <div className="max-w-md mx-auto">
        <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">&larr; Back</button>
        <h2 className="text-2xl font-bold mb-4">Join Competition</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Competition Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full p-2 border rounded"
              placeholder="Enter code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <button
            onClick={handleJoin}
            disabled={!code || !name}
            className="w-full py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Join Competition
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">&larr; Back</button>
      <h2 className="text-2xl font-bold mb-4">
        {competition?.name} - Question {competition?.currentQuestion}
      </h2>
      
      <div className="mb-6">
        <p className="text-lg">Your Score: {currentPlayer?.score ?? 0}</p>
      </div>

      <button
        onClick={handleBuzz}
        disabled={!canBuzz}
        className={`w-48 h-48 rounded-full transition-colors ${
          currentPlayer?.hasBuzzed
            ? "bg-green-500"
            : canBuzz
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gray-300"
        }`}
      >
        {currentPlayer?.hasBuzzed ? "Buzzed!" : "Buzz"}
      </button>

      {!canBuzz && competition?.status === "active" && (
        <p className="mt-4 text-red-500">
          {currentPlayer?.hasBuzzed ? "Wait for next question" : "Too late!"}
        </p>
      )}

      {competition?.status === "finished" && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Final Scores</h3>
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <div
                key={player._id}
                className={`p-2 ${player._id === playerId ? "font-bold" : ""}`}
              >
                {index + 1}. {player.name}: {player.score}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
