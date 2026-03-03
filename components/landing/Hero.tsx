import Image from "next/image";
import Link from "next/link";
import { Zap, Users, Trophy, Brain } from "lucide-react";
import heroBg from "@/app/assets/hero-bg.png";

const Hero = () => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-zinc-950">
            {/* Background Image / Pattern */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBg}
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-5 dark:opacity-30"
                />
                <div className="absolute inset-0 bg-linear-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-zinc-950 dark:to-zinc-950" />
            </div>

            <div className="container relative z-10 mx-auto px-4 py-32 md:py-40">
                <div className="mx-auto max-w-5xl text-center">
                    <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/50 px-4 py-2 dark:border-indigo-500/30 dark:bg-indigo-500/10">
                        <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">New: Real-time Quiz Battles</span>
                    </div>

                    <h1 className="mb-8 text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-8xl lg:text-9xl">
                        Ready to <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent italic">Quiz?</span>
                    </h1>

                    <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-2xl">
                        Challenge your friends, host live events, and dominate the global leaderboard. The most powerful quiz platform for everyone.
                    </p>

                    <div className="flex flex-col justify-center gap-5 sm:flex-row">
                        <Link
                            href="/quiz"
                            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-10 py-5 text-xl font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/40 active:scale-95"
                        >
                            <Zap className="mr-3 h-6 w-6 fill-current" />
                            Play Now
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-10 py-5 text-xl font-bold text-zinc-900 transition-all hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-800 active:scale-95 shadow-sm"
                        >
                            <Trophy className="mr-3 h-6 w-6" />
                            Rankings
                        </Link>
                    </div>

                    <div className="mx-auto mt-24 grid max-w-2xl grid-cols-3 gap-12 border-t border-zinc-100 pt-12 dark:border-zinc-800/50">
                        {[
                            { icon: Users, label: "Active Players", value: "10K+" },
                            { icon: Brain, label: "Total Quizzes", value: "5K+" },
                            { icon: Trophy, label: "Daily Winners", value: "2K+" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group">
                                <stat.icon className="mx-auto mb-3 h-8 w-8 text-indigo-600 transition-transform group-hover:scale-110" />
                                <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{stat.value}</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
