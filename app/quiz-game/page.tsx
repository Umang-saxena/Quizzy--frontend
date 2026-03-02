"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, Trophy, XCircle, Zap } from "lucide-react";

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
      <section className="flex min-h-screen items-center justify-center bg-linear-to-b from-indigo-50 via-white to-violet-50 px-4 pt-24 pb-12">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <Trophy className="mx-auto mb-4 h-16 w-16 text-violet-600" />
          <h1 className="mb-2 text-3xl font-bold text-zinc-900">Game Over</h1>
          <p className="mb-6 text-zinc-600">Great job, {playerName}.</p>
          <div className="mb-2 text-5xl font-bold text-indigo-600">{score}</div>
          <p className="mb-8 text-sm text-zinc-500">points scored</p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Play Again
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-violet-50 pt-16">
      <div className="border-b border-zinc-200/80 bg-white/80 px-4 py-3 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-600">{roomCode}</span>
            <span className="text-sm font-medium text-zinc-800">{playerName}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm font-bold text-indigo-700">
              <Zap className="h-4 w-4" />
              {score}
            </span>
            <span className="text-xs text-zinc-500">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="mb-8 w-full">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm text-zinc-600">
              <Clock className="h-4 w-4" />
              Time
            </span>
            <span className={`text-lg font-bold ${timeLeft <= 5 ? "text-red-600" : "text-indigo-700"}`}>{timeLeft}s</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="w-full">
          <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900 md:text-3xl">{question.question}</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {question.options.map((option, index) => {
              let stateClass = "border-zinc-200 bg-white hover:border-indigo-300";

              if (isRevealed) {
                if (index === question.correct) {
                  stateClass = "border-emerald-300 bg-emerald-50";
                } else if (index === selectedOption && index !== question.correct) {
                  stateClass = "border-red-300 bg-red-50";
                } else {
                  stateClass = "border-zinc-200 bg-white opacity-60";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(index)}
                  disabled={isRevealed}
                  className={`rounded-xl border p-5 text-left font-medium text-zinc-800 transition ${stateClass}`}
                >
                  <span className="mr-2 text-xs font-bold opacity-60">{optionLabels[index]}</span>
                  {option}
                  {isRevealed && index === question.correct && <CheckCircle2 className="ml-2 inline h-5 w-5 text-emerald-600" />}
                  {isRevealed && index === selectedOption && index !== question.correct && (
                    <XCircle className="ml-2 inline h-5 w-5 text-red-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {isRevealed && (
          <div className="mt-8">
            <button
              onClick={handleNext}
              className="rounded-lg bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function QuizGamePage() {
  return (
    <Suspense fallback={<section className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-violet-50 pt-24" />}>
      <QuizGamePageContent />
    </Suspense>
  );
}
