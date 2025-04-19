import { useState } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { AdminInterface } from "./AdminInterface";
import { PlayerInterface } from "./PlayerInterface";
import { Toaster } from "sonner";

export default function App() {
  const [mode, setMode] = useState<"select" | "admin" | "player">("select");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold accent-text">Quiz Buzzer</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl mx-auto">
          <Authenticated>
            {mode === "select" && (
              <div className="flex flex-col items-center gap-8">
                <h1 className="text-5xl font-bold accent-text mb-4">Quiz Buzzer</h1>
                <div className="flex gap-4">
                  <button
                    onClick={() => setMode("admin")}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => setMode("player")}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Player
                  </button>
                </div>
              </div>
            )}
            {mode === "admin" && <AdminInterface onBack={() => setMode("select")} />}
            {mode === "player" && <PlayerInterface onBack={() => setMode("select")} />}
          </Authenticated>
          <Unauthenticated>
            <div className="text-center">
              <h1 className="text-5xl font-bold accent-text mb-4">Quiz Buzzer</h1>
              <p className="text-xl text-slate-600 mb-8">Sign in to get started</p>
              <SignInForm />
            </div>
          </Unauthenticated>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
