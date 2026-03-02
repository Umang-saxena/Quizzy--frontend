"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, Zap } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) return;
    router.push("/quiz");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-linear-to-b from-indigo-50 via-white to-violet-50 px-4 pt-24 pb-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Zap className="h-6 w-6 text-indigo-600" />
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
              Quizzy
            </span>
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            {isLogin ? "Sign in to host quizzes" : "Start hosting live quizzes"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="relative block">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring-4"
            />
          </label>

          <label className="relative block">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring-4"
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {isLogin ? "Sign In" : "Sign Up"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin((value) => !value)}
            className="font-medium text-indigo-700 hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </section>
  );
}
