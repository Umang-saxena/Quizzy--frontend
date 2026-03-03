import { Zap, Users, Timer, Trophy } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Real-time Gameplay",
        description: "Answer questions in real-time with live feedback and instant scoring.",
        color: "text-indigo-600",
        bg: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
        icon: Users,
        title: "Multiplayer Rooms",
        description: "Create or join rooms with friends. No sign-up needed to play!",
        color: "text-emerald-600",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
        icon: Timer,
        title: "Timed Challenges",
        description: "Race against the clock. Faster answers mean higher scores.",
        color: "text-sky-600",
        bg: "bg-sky-50 dark:bg-sky-500/10",
    },
    {
        icon: Trophy,
        title: "Live Leaderboard",
        description: "Track rankings in real-time and compete for the top spot.",
        color: "text-violet-600",
        bg: "bg-violet-50 dark:bg-violet-500/10",
    },
];

const Features = () => (
    <section className="relative py-20 md:py-24 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-5xl dark:text-zinc-100">
                    Why <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent italic">Quizzy</span>?
                </h2>
                <p className="mx-auto max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
                    Everything you need for the ultimate quiz experience.
                </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="rounded-3xl border border-zinc-200 bg-white p-8 transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-500/60"
                    >
                        <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${feature.bg}`}>
                            <feature.icon className={`h-7 w-7 ${feature.color}`} />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">{feature.title}</h3>
                        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Features;
