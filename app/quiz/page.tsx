"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Crown, Gamepad2, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuizPage() {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const handleJoin = (event: React.FormEvent) => {
    event.preventDefault();
    const code = roomCode.trim().toUpperCase();
    const name = playerName.trim();
    if (!code || !name) return;
    router.push(`/quiz-game?room=${encodeURIComponent(code)}&name=${encodeURIComponent(name)}`);
  };

  return (
    <section className="min-h-screen bg-white dark:bg-zinc-950 px-4 pt-32 pb-16 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 dark:border-indigo-500/30 dark:bg-indigo-500/10">
            <Star className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">New Quiz Experience</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-zinc-900 md:text-6xl dark:text-zinc-50">
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent italic">Join or Host</span> a Quiz
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Ready for a challenge? Connect with players worldwide or create your own custom battleground.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Join Card */}
          <div className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-indigo-500/5 transition-all hover:border-indigo-500/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none dark:hover:border-indigo-500/60">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10">
              <Gamepad2 className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Join a Room</h2>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">Jump straight into the action. No account required to play!</p>

            <form onSubmit={handleJoin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Your Name</label>
                <Input
                  placeholder="Enter your nickname"
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value)}
                  className="h-12 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Room Code</label>
                <Input
                  placeholder="ABC123"
                  value={roomCode}
                  onChange={(event) => setRoomCode(event.target.value)}
                  maxLength={6}
                  className="h-14 text-center font-mono text-2xl tracking-[0.3em] uppercase border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 focus:ring-indigo-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-transform active:scale-95 disabled:opacity-50"
                disabled={!roomCode.trim() || !playerName.trim()}
              >
                <Users className="mr-2 h-5 w-5 fill-current" />
                Join Battle
              </Button>
            </form>
          </div>

          {/* Host Card */}
          <div className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-indigo-500/5 transition-all hover:border-violet-500/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none dark:hover:border-violet-500/60">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-500/10">
              <Crown className="h-8 w-8 text-violet-600" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Host a Room</h2>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">Take control and organize your own trivia events.</p>

            <div className="space-y-6">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-800/50">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Host Perks</p>
                <ul className="space-y-3">
                  {["Create custom quizzes", "Set live time limits", "Real-time moderation", "Advanced analytics"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      <div className="h-2 w-2 rounded-full bg-violet-500 shadow-sm shadow-violet-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/login")}
                className="w-full h-14 text-lg font-bold border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-500/30 dark:text-violet-400 dark:hover:bg-violet-500/10 transition-transform active:scale-95 shadow-sm"
              >
                <Crown className="mr-2 h-5 w-5" />
                Start Hosting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
