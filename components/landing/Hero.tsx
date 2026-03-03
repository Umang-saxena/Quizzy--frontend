import Image from "next/image";
import Link from "next/link";
import { Zap, Users, Trophy, Brain } from "lucide-react";
import heroBg from "@/app/assets/hero-bg.png";

const Hero = () => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="absolute inset-0">
                <Image
                    src={heroBg}
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-35"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4 py-20 md:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-4 py-2">
                        <Zap className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-300">Live & Real-time</span>
                    </div>

                    <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-100 md:text-7xl lg:text-8xl">
                        <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzy</span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-zinc-300 md:text-2xl">
                        Host live quizzes, compete in real-time, and climb the leaderboard.
                        The ultimate quiz battle platform.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/quiz"
                            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-700"
                        >
                            <Zap className="mr-2 h-5 w-5" />
                            Start Playing
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="inline-flex items-center justify-center rounded-xl border border-indigo-500/40 px-8 py-4 text-lg font-semibold text-indigo-300 transition-colors hover:bg-indigo-500/10"
                        >
                            <Trophy className="mr-2 h-5 w-5" />
                            Leaderboard
                        </Link>
                    </div>

                    <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
                        {[
                            { icon: Users, label: "Players", value: "10K+" },
                            { icon: Brain, label: "Quizzes", value: "5K+" },
                            { icon: Trophy, label: "Winners", value: "2K+" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <stat.icon className="mx-auto mb-2 h-6 w-6 text-indigo-600" />
                                <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                                <div className="text-sm text-zinc-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
