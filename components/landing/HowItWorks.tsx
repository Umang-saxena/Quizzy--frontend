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
    <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.08)_0%,transparent_70%)]" />
        <div className="container relative z-10 mx-auto px-4">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-5xl">
                    How It <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Works</span>
                </h2>
                <p className="mx-auto max-w-xl text-lg text-zinc-300">
                    Three simple steps to start quizzing.
                </p>
            </div>

            <div className="mx-auto flex max-w-4xl flex-col gap-8 md:flex-row">
                {steps.map((s, i) => (
                    <div key={s.step} className="relative flex-1 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80">
                            <s.icon className="h-7 w-7 text-indigo-600" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Step {s.step}</span>
                        <h3 className="mb-2 mt-2 text-xl font-semibold text-zinc-100">{s.title}</h3>
                        <p className="text-sm leading-relaxed text-zinc-400">{s.description}</p>

                        {i < steps.length - 1 && (
                            <div className="absolute right-0 top-8 hidden h-0.5 w-8 translate-x-1/2 bg-zinc-700 md:block" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HowItWorks;

