/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";
import {
  Card,
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Id } from "../convex/_generated/dataModel";
import { Html5Qrcode } from "html5-qrcode";

// Initialize buzz sound
const buzzSound = new Audio("/sounds/Buzz.mp3");

export function PlayerInterface({ onBack }: { onBack: () => void }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [playerId, setPlayerId] = useState<Id<"players">>();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const joinCompetition = useMutation(api.competitions.joinCompetition);
  const buzz = useMutation(api.competitions.buzz);
  
  const competition = useQuery(api.competitions.getCompetition, 
    code ? { code } : "skip"
  );
  const players = useQuery(api.competitions.getPlayers, 
    competition ? { competitionId: competition._id } : "skip"
  ) ?? [];

  const currentPlayer = players.find((p) => p._id === playerId);
  const canBuzz = competition?.status === "active" && !currentPlayer?.hasBuzzed;

  useEffect(() => {
    if (isScannerOpen && !scanner) {
      const newScanner = new Html5Qrcode("qr-reader");
      setScanner(newScanner);

      newScanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // Extract code from URL if it's a full URL
          const match = decodedText.match(/\/join\/([A-Z0-9]+)$/);
          if (match) {
            setCode(match[1]);
          } else {
            setCode(decodedText);
          }
          setIsScannerOpen(false);
          toast.success("Code scanned successfully!");
        },
        (errorMessage) => {
          console.error("QR Code scanning error:", errorMessage);
        }
      ).catch((error) => {
        console.error("Failed to start scanner:", error);
        toast.error("Failed to start camera");
        setIsScannerOpen(false);
      });
    }

    return () => {
      if (scanner) {
        scanner.stop().catch(console.error);
        setScanner(null);
      }
    };
  }, [isScannerOpen, scanner]);

  const handleJoin = async () => {
    try {
      const id = await joinCompetition({
        code,
        playerName: name,
      });
      setPlayerId(id);
      toast.success("Joined competition!");
    } catch (error) {
      toast.error("Failed to join competition");
    }
  };

  const handleBuzz = async () => {
    if (!playerId) return;
    try {
      buzzSound.play().catch((error) => console.error("Error playing sound:", error));
      await buzz({ playerId });
      toast.success("Buzzed in!");
    } catch (error) {
      toast.error("Failed to buzz in");
    }
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (PNG, JPG, or GIF)");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return false;
    }

    return true;
  };

  const handleImageUpload = async (file: File) => {
    if (!scanner || !validateFile(file)) return;
    
    try {
      setIsScanning(true);
      setScanError(null);
      setPreviewUrl(URL.createObjectURL(file));
      
      // Attempt to scan the file once
      const result = await scanner.scanFile(file, true);

      // Validate the scanned result
      if (!result) {
        throw new Error("No QR code found in the image");
      }

      // Extract the competition code - handle both URL and direct code formats
      let extractedCode;
      const urlMatch = result.match(/\/join\/([A-Z0-9]+)$/);
      const directMatch = result.match(/^[A-Z0-9]+$/);
      
      if (urlMatch) {
        extractedCode = urlMatch[1];
      } else if (directMatch) {
        extractedCode = directMatch[0];
      } else {
        // Try to clean the result and use it directly
        extractedCode = result.replace(/[^A-Z0-9]/g, '');
      }

      // Validate the extracted code
      if (!extractedCode || extractedCode.length < 4) {
        throw new Error("Invalid competition code format");
      }
      
      // Set the code
      setCode(extractedCode);
      
      // If name is already entered, automatically join
      if (name.trim()) {
        try {
          const id = await joinCompetition({
            code: extractedCode,
            playerName: name,
          });
          setPlayerId(id);
          toast.success("Successfully joined the competition!");
          setIsScannerOpen(false);
        } catch (error) {
          console.error("Error joining competition:", error);
          setScanError("Failed to join competition. Please check if the competition exists and is active.");
          toast.error("Failed to join competition. Please check if the competition exists and is active.");
        }
      } else {
        // If no name, just close scanner and let user enter name
        setIsScannerOpen(false);
        toast.success("Code scanned! Please enter your name to join.");
      }
    } catch (error) {
      console.error("Error during QR code scanning or competition joining:", error);
      if (error instanceof Error) {
        setScanError(`Error: ${error.message}. Please ensure the QR code is clear and well-lit, or try another image/camera scanner.`);
        toast.error(`Error: ${error.message}. Please ensure the QR code is clear and well-lit, or try another image/camera scanner.`);
      } else {
        setScanError("An unknown error occurred during QR code scanning. Please try again.");
        toast.error("An unknown error occurred during QR code scanning. Please try again.");
      }
      setRetryCount(prev => prev + 1);
    } finally {
      setIsScanning(false);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  };

  const handleRetry = () => {
    setScanError(null);
    setRetryCount(0);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  if (!playerId) {
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
            Join Competition
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
                Your Name
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
                placeholder="Enter your name"
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
                Competition Code
              </Typography>
              <div className="flex gap-2">
                <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="!border !border-gray-300 focus:!border-blue-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
              placeholder="Enter code"
                  crossOrigin=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
                <Button
                  onClick={() => setIsScannerOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v4m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </Button>
              </div>
            </div>
            <Button
              onClick={handleJoin}
              disabled={!code || !name}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Join Competition
            </Button>
          </div>
        </Card>

        <Dialog 
          open={isScannerOpen} 
          handler={() => setIsScannerOpen(false)}
          size="lg"
          className="bg-white/95 backdrop-blur-sm"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <DialogHeader
            className="border-b border-gray-200 pb-4"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <Typography 
              variant="h4" 
              className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Scan Competition QR Code
            </Typography>
            <Typography 
              variant="small" 
              className="text-gray-600 mt-2"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Use your camera or upload an image containing the QR code
            </Typography>
          </DialogHeader>
          <DialogBody
            className="p-6"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <div id="qr-reader" className="w-full aspect-square rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg"></div>
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-500"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <div 
                  className={`w-full max-w-md p-6 bg-gray-50 rounded-lg border-2 border-dashed ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  } transition-colors duration-200`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file) {
                      void handleImageUpload(file);
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Typography 
                      variant="h6" 
                      className="text-center text-gray-700"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Upload QR Code Image
                    </Typography>
                    <div className="relative group">
                      <svg className="w-5 h-5 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="absolute right-0 w-64 p-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        Tips for scanning QR codes:
                        <ul className="list-disc list-inside mt-1">
                          <li>Ensure good lighting</li>
                          <li>Keep the image clear and focused</li>
                          <li>QR code should be well-centered</li>
                          <li>Supported formats: PNG, JPG, GIF</li>
                          <li>Make sure the QR code is not blurry</li>
                          <li>Try using the camera scanner if image upload fails</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
            <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleImageUpload(file);
                        }
                      }}
                      className="hidden"
                      id="qr-file-input"
                    />
                    <label
                      htmlFor="qr-file-input"
                      className={`w-full flex flex-col items-center px-4 py-6 bg-white text-gray-700 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors ${
                        isScanning ? 'opacity-50 cursor-wait' : ''
                      }`}
                    >
                      {isScanning ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                          <Typography 
                            variant="small" 
                            className="text-center text-blue-600"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                          >
                            Scanning QR Code...
                          </Typography>
                        </div>
                      ) : (
                        <>
                          <svg className="w-8 h-8 mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <Typography 
                            variant="small" 
                            className="text-center"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                          >
                            {isDragging ? "Drop image here" : "Click to upload or drag and drop"}
                          </Typography>
                          <Typography 
                            variant="small" 
                            className="text-gray-500 mt-1"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                          >
                            PNG, JPG, GIF up to 10MB
                          </Typography>
                        </>
                      )}
                    </label>
                    {previewUrl && (
                      <div className="mt-4 relative w-full">
                        <img 
                          src={previewUrl} 
                          alt="QR Code Preview" 
                          className="w-full h-48 object-contain rounded-lg border border-gray-200"
                        />
                        {isScanning && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                          </div>
                        )}
                        {scanError && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col items-center justify-center p-4">
                            <Typography 
                              variant="small" 
                              className="text-white text-center mb-2"
                              placeholder=""
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                            >
                              {scanError}
                            </Typography>
                            <Button
                              size="sm"
                              onClick={handleRetry}
                              className="bg-white text-gray-900 hover:bg-gray-100"
                              placeholder=""
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                            >
                              Try Again
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    {retryCount > 0 && !scanError && (
                      <Typography 
                        variant="small" 
                        className="text-gray-500 text-center"
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        Attempt {retryCount + 1}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
          </div>
          </DialogBody>
          <DialogFooter
            className="border-t border-gray-200 pt-4"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <Button
              variant="text"
              onClick={() => setIsScannerOpen(false)}
              className="mr-2 text-gray-600 hover:text-gray-800"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Cancel
            </Button>
            <Button
              variant="text"
              onClick={() => {
                if (scanner) {
                  scanner.stop().catch(console.error);
                  setScanner(null);
                }
                setIsScannerOpen(false);
              }}
              className="text-blue-600 hover:text-blue-800"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Close Scanner
            </Button>
          </DialogFooter>
        </Dialog>
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
        <div className="text-center mb-8">
          <Typography 
            variant="h3" 
            className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {competition?.name}
          </Typography>
          <Typography 
            variant="h5" 
            className="text-gray-700"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Question {competition?.currentQuestion}
          </Typography>
      </div>
        
        <div className="text-center mb-8">
          <Typography 
            variant="h4" 
            className="font-bold text-gray-800"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Your Score: {currentPlayer?.score ?? 0}
          </Typography>
        </div>

        <div className="flex justify-center mb-8">
          <button
        onClick={handleBuzz}
        disabled={!canBuzz}
            className={`w-48 h-48 rounded-full transition-all duration-300 transform hover:scale-105 ${
          currentPlayer?.hasBuzzed
                ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
            : canBuzz
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Typography 
              variant="h4" 
              className="text-white font-bold"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
      >
        {currentPlayer?.hasBuzzed ? "Buzzed!" : "Buzz"}
            </Typography>
      </button>
        </div>

      {!canBuzz && competition?.status === "active" && (
          <Typography 
            variant="h6" 
            className="text-center text-red-500"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
          {currentPlayer?.hasBuzzed ? "Wait for next question" : "Too late!"}
          </Typography>
      )}

      {competition?.status === "finished" && (
        <div className="mt-8">
            <Typography 
              variant="h4" 
              className="text-center font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Final Scores
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
                  <Card
                key={player._id}
                    className={`p-4 ${
                      player._id === playerId
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500"
                        : "bg-white"
                    }`}
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    <div className="flex justify-between items-center">
                      <Typography 
                        variant="h6" 
                        className={player._id === playerId ? "font-bold text-blue-600" : ""}
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        {index + 1}. {player.name}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        className={player._id === playerId ? "font-bold text-blue-600" : ""}
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        {player.score}
                      </Typography>
              </div>
                  </Card>
            ))}
            </div>
        </div>
      )}
      </Card>
    </div>
  );
}