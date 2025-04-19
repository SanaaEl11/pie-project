import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";

export function AdminInterface({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [numPlayers, setNumPlayers] = useState(2);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [competitionCode, setCompetitionCode] = useState<string>();
  
  const createCompetition = useMutation(api.competitions.createCompetition);
  const startCompetition = useMutation(api.competitions.startCompetition);
  const endCompetition = useMutation(api.competitions.endCompetition);
  const updateScore = useMutation(api.competitions.updateScore);

  const competition = useQuery(api.competitions.getCompetition, 
    competitionCode ? { code: competitionCode } : "skip"
  );
  const players = useQuery(api.competitions.getPlayers, 
    competition ? { competitionId: competition._id } : "skip"
  ) ?? [];

  const handleCreate = async () => {
    try {
      if (numPlayers > 10) {
        toast.error("Payment required for more than 10 players");
        return;
      }
      const code = await createCompetition({
        name,
        numPlayers,
        timePerQuestion,
      });
      setCompetitionCode(code);
      toast.success("Competition created!");
    } catch (error) {
      toast.error("Failed to create competition");
    }
  };

  if (!competitionCode || !competition) {
    return (
      <div className="max-w-md mx-auto">
        <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">&larr; Back</button>
        <h2 className="text-2xl font-bold mb-4">Create Competition</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Competition Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Number of Players</label>
            <input
              type="number"
              min="2"
              value={numPlayers}
              onChange={(e) => setNumPlayers(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time per Question (seconds)</label>
            <input
              type="number"
              min="10"
              value={timePerQuestion}
              onChange={(e) => setTimePerQuestion(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={!name || numPlayers < 2}
            className="w-full py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Create Competition
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">&larr; Back</button>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Competition: {competition.name}</h2>
          <div className="text-lg font-mono bg-gray-100 p-2 rounded">
            Code: {competition.code}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Players</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.map((player) => (
              <div
                key={player._id}
                className={`p-4 rounded-lg border ${
                  player._id === competition.currentBuzzer
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{player.name}</span>
                  <span className="text-lg">Score: {player.score}</span>
                </div>
                {player._id === competition.currentBuzzer && (
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => updateScore({ playerId: player._id, correct: true })}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Correct
                    </button>
                    <button
                      onClick={() => updateScore({ playerId: player._id, correct: false })}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Incorrect
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            Question {competition.currentQuestion}
          </div>
          {competition.status === "waiting" && (
            <button
              onClick={() => startCompetition({ competitionId: competition._id })}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Start Competition
            </button>
          )}
          {competition.status === "active" && (
            <button
              onClick={() => endCompetition({ competitionId: competition._id })}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              End Competition
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
