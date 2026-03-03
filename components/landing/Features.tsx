import { Zap, Users, Timer, Trophy } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Real-time Gameplay",
        description: "Answer questions in real-time with live feedback and instant scoring.",
        color: "text-indigo-600",
        bg: "bg-indigo-100",
    },
    {
        icon: Users,
        title: "Multiplayer Rooms",
        description: "Create or join rooms with friends. No sign-up needed to play!",
        color: "text-emerald-600",
        bg: "bg-emerald-100",
    },
    {
        icon: Timer,
        title: "Timed Challenges",
        description: "Race against the clock. Faster answers mean higher scores.",
        color: "text-sky-600",
        bg: "bg-sky-100",
    },
    {
        icon: Trophy,
        title: "Live Leaderboard",
        description: "Track rankings in real-time and compete for the top spot.",
        color: "text-violet-600",
        bg: "bg-violet-100",
    },
];

const Features = () => (
    <section className="relative py-20 md:py-24">
        <div className="container px-4">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-5xl">
                    Why <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzy</span>?
                </h2>
                <p className="mx-auto max-w-xl text-lg text-zinc-300">
                    Everything you need for the ultimate quiz experience.
                </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 transition-colors hover:border-indigo-500/60"
                    >
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bg}`}>
                            <feature.icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-zinc-100">{feature.title}</h3>
                        <p className="text-sm leading-relaxed text-zinc-400">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Features;
