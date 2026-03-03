import { Zap } from "lucide-react";
import Link from "next/link";

const Footer = () => (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    <Zap className="h-5 w-5 text-indigo-600" />
                    <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzy</span>
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">The ultimate real-time quiz battle platform.</p>
            </div>

            <nav className="flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <Link href="/quiz" className="transition-colors hover:text-indigo-600 dark:hover:text-zinc-100">Play</Link>
                <Link href="/leaderboard" className="transition-colors hover:text-indigo-600 dark:hover:text-zinc-100">Leaderboard</Link>
                <Link href="/login" className="transition-colors hover:text-indigo-600 dark:hover:text-zinc-100">Sign In</Link>
            </nav>

            <div className="text-center md:text-right">
                <p className="text-sm text-zinc-500 dark:text-zinc-500">© 2026 Quizzy Inc.</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">Built with passion for curious minds.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
