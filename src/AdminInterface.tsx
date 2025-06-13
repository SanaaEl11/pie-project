/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";
import {
  Card,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

// Initialize sound effects
const correctSound = new Audio("/sounds/correct.mp3");
const incorrectSound = new Audio("/sounds/incorrect.mp3");

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
        <Button
          variant="text"
          onClick={onBack}
          className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Button>
        <Card 
          className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <Typography 
            variant="h3" 
            className="text-center font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Create Competition
          </Typography>
          <div className="space-y-6">
            <div>
              <Typography 
                variant="small" 
                className="mb-2 font-medium text-gray-700"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Competition Name
              </Typography>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="!border !border-gray-300 focus:!border-blue-500"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                placeholder="Enter competition name"
                crossOrigin=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              />
            </div>
            <div>
              <Typography 
                variant="small" 
                className="mb-2 font-medium text-gray-700"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Number of Players
              </Typography>
              <Input
                type="number"
                min="2"
                value={numPlayers}
                onChange={(e) => setNumPlayers(parseInt(e.target.value))}
                className="!border !border-gray-300 focus:!border-blue-500"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              />
            </div>
            <div>
              <Typography 
                variant="small" 
                className="mb-2 font-medium text-gray-700"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Time per Question (seconds)
              </Typography>
              <Input
                type="number"
                min="10"
                value={timePerQuestion}
                onChange={(e) => setTimePerQuestion(parseInt(e.target.value))}
                className="!border !border-gray-300 focus:!border-blue-500"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              />
            </div>
            <Button
              onClick={handleCreate}
              disabled={!name || numPlayers < 2}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Create Competition
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="text"
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </Button>
      <Card 
        className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div>
            <Typography 
              variant="h3" 
              className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              {competition.name}
            </Typography>
            <Typography 
              variant="h5" 
              className="text-gray-700"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Question {competition.currentQuestion}
            </Typography>
          </div>
          <Card 
            className="p-4 bg-white/80 backdrop-blur-sm border border-gray-200"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <Typography 
              variant="small" 
              className="text-center font-medium mb-2 text-gray-700"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Scan to Join
            </Typography>
            <QRCodeCanvas
              value={`${window.location.origin}/join/${competition.code}`}
              size={128}
              includeMargin={true}
              className="rounded"
            />
            <Typography 
              variant="small" 
              className="text-center font-mono mt-2 text-gray-700"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Code: {competition.code}
            </Typography>
          </Card>
        </div>

        <div className="mb-8">
          <Typography 
            variant="h4" 
            className="font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Players
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.map((player) => (
              <Card
                key={player._id}
                className={`p-4 transition-all duration-300 ${
                  player._id === competition.currentBuzzer
                    ? "bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500"
                    : "bg-white border border-gray-200"
                }`}
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <div className="flex justify-between items-center">
                  <Typography 
                    variant="h6" 
                    className={player._id === competition.currentBuzzer ? "text-green-600 font-bold" : ""}
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    {player.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    className={player._id === competition.currentBuzzer ? "text-green-600 font-bold" : ""}
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Score: {player.score}
                  </Typography>
                </div>
                {player._id === competition.currentBuzzer && (
                  <div className="mt-4 flex gap-3">
                    <Button
                      onClick={() => {
                        correctSound.play().catch((e) => console.error("Sound play error:", e));
                        updateScore({ playerId: player._id, correct: true });
                      }}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Correct
                    </Button>
                    <Button
                      onClick={() => {
                        incorrectSound.play().catch((e) => console.error("Sound play error:", e));
                        updateScore({ playerId: player._id, correct: false });
                      }}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Incorrect
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Typography 
            variant="h5" 
            className="text-gray-700"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Question {competition.currentQuestion}
          </Typography>
          {competition.status === "waiting" && (
            <Button
              onClick={() => startCompetition({ competitionId: competition._id })}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Start Competition
            </Button>
          )}
          {competition.status === "active" && (
            <Button
              onClick={() => endCompetition({ competitionId: competition._id })}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              End Competition
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}