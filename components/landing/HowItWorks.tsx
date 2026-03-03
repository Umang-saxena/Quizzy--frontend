import { LogIn, Gamepad2, Trophy } from "lucide-react";

const steps = [
    {
        step: "01",
        icon: LogIn,
        title: "Join or Host",
        description: "Enter a room code to join instantly, or sign in to host your own quiz.",
    },
    {
        step: "02",
        icon: Gamepad2,
        title: "Play Live",
        description: "Answer questions in real-time. Speed and accuracy both matter!",
    },
    {
        step: "03",
        icon: Trophy,
        title: "Win & Climb",
        description: "Score points, beat opponents, and rise on the global leaderboard.",
    },
];

const HowItWorks = () => (
    <section className="relative py-20 md:py-24 bg-white dark:bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)]" />
        <div className="container relative z-10 mx-auto px-4">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-5xl dark:text-zinc-100">
                    How It <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent italic">Works</span>
                </h2>
                <p className="mx-auto max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
                    Three simple steps to start quizzing.
                </p>
            </div>

            <div className="mx-auto flex max-w-5xl flex-col gap-12 md:flex-row">
                {steps.map((s, i) => (
                    <div key={s.step} className="relative flex-1 text-center group">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-200 bg-white shadow-lg shadow-indigo-500/5 transition-transform group-hover:scale-110 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
                            <s.icon className="h-9 w-9 text-indigo-600" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Step {s.step}</span>
                        <h3 className="mb-3 mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{s.title}</h3>
                        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{s.description}</p>

                        {i < steps.length - 1 && (
                            <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-zinc-200 dark:bg-zinc-800 md:block max-w-[100px]" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HowItWorks;
