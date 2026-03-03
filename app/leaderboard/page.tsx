"use client";

import { useMemo, useState } from "react";
import { Trophy, Zap } from "lucide-react";

const players = [
  { rank: 1, name: "QuizMaster99", score: 9850, streak: 12, avatar: "🧠" },
  { rank: 2, name: "SpeedDemon", score: 9200, streak: 10, avatar: "⚡" },
  { rank: 3, name: "BrainiacX", score: 8700, streak: 8, avatar: "🎯" },
  { rank: 4, name: "TriviaKing", score: 8100, streak: 7, avatar: "👑" },
  { rank: 5, name: "QuickThink", score: 7600, streak: 6, avatar: "🚀" },
  { rank: 6, name: "FactHunter", score: 7100, streak: 5, avatar: "🔍" },
  { rank: 7, name: "NerdAlert", score: 6500, streak: 4, avatar: "🤓" },
  { rank: 8, name: "WisdomOwl", score: 5900, streak: 3, avatar: "🦉" },
];

const rankColors: Record<number, string> = {
  1: "text-violet-600",
  2: "text-zinc-500",
  3: "text-amber-600",
};

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"global" | "weekly">("global");

  const displayPlayers = useMemo(() => {
    if (tab === "global") return players;
    return [...players].map((player) => ({
      ...player,
      score: Math.round(player.score * 0.35),
      streak: Math.max(1, Math.round(player.streak * 0.5)),
    }));
  }, [tab]);

  return (
    <section className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-4 pt-24 pb-16">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-100 md:text-5xl">
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Leaderboard</span>
          </h1>
          <p className="text-zinc-300">Top players ranked by score.</p>
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {(["global", "weekly"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
                tab === item
                  ? "border border-indigo-500/40 bg-indigo-500/20 text-indigo-300"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              {item === "global" ? "All Time" : "This Week"}
            </button>
          ))}
        </div>

        <div className="mb-10 flex items-end justify-center gap-4">
          {[displayPlayers[1], displayPlayers[0], displayPlayers[2]].map((player, index) => {
            const heights = ["h-28", "h-36", "h-24"];
            const sizes = ["text-3xl", "text-4xl", "text-3xl"];

            return (
              <div key={player.rank} className="flex flex-col items-center">
                <span className={`${sizes[index]} mb-2`}>{player.avatar}</span>
                <span className="mb-1 text-sm font-medium text-zinc-200">{player.name}</span>
                <span className={`text-xs font-bold ${rankColors[player.rank] || "text-zinc-500"}`}>#{player.rank}</span>
                <div
                  className={`${heights[index]} mt-2 flex w-20 items-center justify-center rounded-t-lg border border-zinc-800 bg-zinc-900`}
                >
                  <span className="text-sm font-bold text-indigo-700">{player.score.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          {displayPlayers.map((player) => (
            <div
              key={player.rank}
              className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 transition-colors hover:border-indigo-500/60"
            >
              <span className={`w-8 text-center text-sm font-bold ${rankColors[player.rank] || "text-zinc-500"}`}>
                {player.rank <= 3 ? <Trophy className="mx-auto h-5 w-5" /> : `#${player.rank}`}
              </span>
              <span className="text-2xl">{player.avatar}</span>
              <div className="flex-1">
                <p className="font-semibold text-zinc-100">{player.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                  <Zap className="h-3 w-3" />
                  {player.streak} streak
                </p>
              </div>
              <span className="text-lg font-bold text-indigo-700">{player.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
