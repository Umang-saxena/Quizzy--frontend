"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, Trophy, XCircle, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const dynamic = "force-dynamic";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correct: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correct: 2,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"],
    correct: 1,
  },
];

const optionLabels = ["A", "B", "C", "D"];

function QuizGamePageContent() {
  const searchParams = useSearchParams();
  const playerName = searchParams.get("name") || "Player";
  const roomCode = searchParams.get("room") || "???";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);

  const question = questions[currentIndex];
  const isRevealed = selectedOption !== null || timeLeft <= 0;

  useEffect(() => {
    if (isRevealed || gameOver) return;
    const timer = window.setTimeout(() => {
      setTimeLeft((value) => Math.max(value - 1, 0));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [isRevealed, gameOver, timeLeft]);

  const progress = useMemo(() => (timeLeft / 15) * 100, [timeLeft]);

  const handleSelect = (index: number) => {
    if (isRevealed) return;
    setSelectedOption(index);
    if (index === question.correct) {
      setScore((value) => value + 100 + timeLeft * 10);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setGameOver(true);
      return;
    }
    setCurrentIndex((value) => value + 1);
    setSelectedOption(null);
    setTimeLeft(15);
  };

  if (gameOver) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950 px-4 pt-24 pb-12 transition-colors duration-300">
        <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-12 text-center shadow-2xl shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10 scale-125">
            <Trophy className="h-10 w-10 text-amber-500 drop-shadow-lg" />
          </div>
          <h1 className="mb-2 text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Game Over!</h1>
          <p className="mb-10 text-lg text-zinc-600 dark:text-zinc-400">Exceptional effort, <span className="text-indigo-600 font-bold">{playerName}</span>.</p>

          <div className="mb-2 text-7xl font-black text-indigo-600 dark:text-indigo-400 drop-shadow-sm">{score}</div>
          <p className="mb-12 text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">Total Score</p>

          <Button
            asChild
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-500/30"
          >
            <Link href="/quiz">Play Again</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-zinc-950 pt-16 transition-colors duration-300">
      {/* Game Header */}
      <div className="border-b border-zinc-200 bg-zinc-50/50 px-4 py-4 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
              <span className="text-xs font-black text-indigo-600">{roomCode}</span>
            </div>
            <span className="text-sm font-black text-zinc-700 dark:text-zinc-300">{playerName}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-lg font-black text-indigo-600 dark:text-indigo-400">
              <Zap className="h-5 w-5 fill-current" />
              {score}
            </span>
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-sm font-bold text-zinc-500">
              Q: <span className="text-indigo-600">{currentIndex + 1}</span> / {questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-12 sm:py-20 text-sans">
        {/* Timer Bar */}
        <div className="mb-16 w-full max-w-2xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
              <Clock className="h-4 w-4" />
              Fast Answer Bonus
            </span>
            <span className={`text-2xl font-black ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-indigo-600"}`}>
              {timeLeft}s
            </span>
          </div>
          <Progress value={progress} className="h-2.5 bg-zinc-100 dark:bg-zinc-800" />
        </div>

        <div className="w-full">
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
              <Star className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <h2 className="mb-12 text-center text-3xl font-black text-zinc-900 md:text-5xl dark:text-zinc-50 leading-tight">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {question.options.map((option, index) => {
              let stateClass = "border-zinc-200 bg-white hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-zinc-800 dark:bg-zinc-900/50";

              if (isRevealed) {
                if (index === question.correct) {
                  stateClass = "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400";
                } else if (index === selectedOption && index !== question.correct) {
                  stateClass = "border-red-500 bg-red-50 text-red-900 dark:bg-red-500/10 dark:text-red-400";
                } else {
                  stateClass = "border-zinc-200 bg-zinc-50/50 opacity-40 dark:border-zinc-800 dark:bg-zinc-900/10";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(index)}
                  disabled={isRevealed}
                  className={`relative flex items-center rounded-2xl border p-6 text-left font-bold transition-all active:scale-95 ${stateClass}`}
                >
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-black text-zinc-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {optionLabels[index]}
                  </div>
                  <span className="flex-1">{option}</span>
                  {isRevealed && index === question.correct && <CheckCircle2 className="ml-2 h-6 w-6 text-emerald-500" />}
                  {isRevealed && index === selectedOption && index !== question.correct && (
                    <XCircle className="ml-2 h-6 w-6 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {isRevealed && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-4">
            <Button
              onClick={handleNext}
              className="px-12 h-14 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-500/30"
            >
              {currentIndex + 1 >= questions.length ? "View Final Results" : "Next Challenge"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)

export default function QuizGamePage() {
  return (
    <Suspense fallback={<section className="min-h-screen bg-white dark:bg-zinc-950 pt-24" />}>
      <QuizGamePageContent />
    </Suspense>
  );
}
