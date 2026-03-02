"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Crown, Gamepad2, Users } from "lucide-react";

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
    <section className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-violet-50 px-4 pt-24 pb-16">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900 md:text-5xl">
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Join or Host</span> a Quiz
          </h1>
          <p className="text-lg text-zinc-600">Choose your path to quiz glory.</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100">
              <Gamepad2 className="h-7 w-7 text-indigo-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-zinc-900">Join a Room</h2>
            <p className="mb-6 text-sm text-zinc-600">No account needed. Just enter the code and play.</p>

            <form onSubmit={handleJoin} className="space-y-4">
              <input
                placeholder="Your name"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring-4"
              />
              <input
                placeholder="Room code (e.g. ABC123)"
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value)}
                maxLength={6}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-center font-mono text-lg tracking-widest text-zinc-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring-4"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!roomCode.trim() || !playerName.trim()}
              >
                <Users className="mr-2 h-4 w-4" />
                Join Room
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100">
              <Crown className="h-7 w-7 text-violet-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-zinc-900">Host a Room</h2>
            <p className="mb-6 text-sm text-zinc-600">Create your own quiz room and control the game.</p>

            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-3 text-sm text-zinc-600">As a host you can:</p>
                <ul className="space-y-2 text-sm text-zinc-700">
                  {["Create custom quizzes", "Set time limits", "Control game flow", "View live results"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => router.push("/auth")}
                className="inline-flex w-full items-center justify-center rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                <Crown className="mr-2 h-4 w-4" />
                Sign In to Host
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
