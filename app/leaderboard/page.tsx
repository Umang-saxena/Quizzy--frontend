"use client";

import { useMemo, useState } from "react";
import { Trophy, Zap, TrendingUp, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  1: "text-amber-500",
  2: "text-zinc-400",
  3: "text-amber-700",
};

const podiumColors: Record<number, string> = {
  1: "bg-amber-500/10 border-amber-500/30",
  2: "bg-zinc-500/10 border-zinc-500/30",
  3: "bg-amber-700/10 border-amber-700/30",
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
    <section className="min-h-screen bg-white dark:bg-zinc-950 px-4 pt-32 pb-16 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 dark:border-indigo-500/30 dark:bg-indigo-500/10">
            <Medal className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Global Standings</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-zinc-900 md:text-6xl dark:text-zinc-50">
            Current <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent italic">Champions</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Witness the icons of the Quizzy community.</p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-12 flex justify-center p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl max-w-sm mx-auto shadow-inner">
          {(["global", "weekly"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${tab === item
                  ? "bg-white text-zinc-900 shadow-md dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
            >
              {item === "global" ? "All Time" : "This Week"}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="mb-16 flex items-end justify-center gap-2 sm:gap-6">
          {[displayPlayers[1], displayPlayers[0], displayPlayers[2]].map((player, index) => {
            const heights = ["h-32 sm:h-40", "h-44 sm:h-56", "h-24 sm:h-32"];
            const sizes = ["text-4xl", "text-6xl", "text-4xl"];
            const isFirst = index === 1;

            return (
              <div key={player.rank} className={`flex flex-col items-center flex-1 max-w-[120px] sm:max-w-[160px] ${isFirst ? "z-10" : "opacity-80"}`}>
                <div className="relative mb-4 group cursor-pointer">
                  <span className={`${sizes[index]} transition-transform group-hover:scale-125 block`}>{player.avatar}</span>
                  {isFirst && (
                    <Trophy className="absolute -top-4 -right-4 h-8 w-8 text-amber-500 drop-shadow-lg" />
                  )}
                </div>
                <span className="mb-1 text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate w-full text-center">{player.name}</span>
                <span className={`text-sm font-black ${rankColors[player.rank]}`}>#{player.rank}</span>
                <div
                  className={`${heights[index]} mt-3 flex w-full flex-col items-center justify-center rounded-t-3xl border ${podiumColors[player.rank]} shadow-2xl shadow-indigo-500/5 backdrop-blur-sm`}
                >
                  <span className="text-lg sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">{player.score.toLocaleString()}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Points</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Player List */}
        <div className="space-y-3">
          <div className="flex items-center px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            <span className="w-12 text-center">Rank</span>
            <span className="flex-1 ml-4">Player</span>
            <span className="w-24 text-right">Points</span>
          </div>

          {displayPlayers.map((player) => (
            <div
              key={player.rank}
              className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-4 transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-500/60"
            >
              <div className={`w-12 text-center text-sm font-black ${rankColors[player.rank] || "text-zinc-400"}`}>
                {player.rank <= 3 ? <Medal className="mx-auto h-6 w-6" /> : player.rank}
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-2xl dark:bg-zinc-800 group-hover:scale-110 transition-transform">
                {player.avatar}
              </div>
              <div className="flex-1">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{player.name}</p>
                <div className="mt-1 flex items-center gap-3">
                  <p className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-500 uppercase tracking-wider">
                    <TrendingUp className="h-3 w-3" />
                    Hot Streak: {player.streak}
                  </p>
                </div>
              </div>
              <div className="w-24 text-right">
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{player.score.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
