import Link from "next/link";
import { Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container px-4">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.12)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-4xl">
              Ready to <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quiz</span>?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-zinc-300">
              Jump into a live quiz right now. No account needed to play!
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              <Zap className="mr-2 h-5 w-5" />
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
