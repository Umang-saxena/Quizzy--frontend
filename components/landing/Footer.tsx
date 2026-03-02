import { Zap } from "lucide-react";
import Link from "next/link";

const Footer = () => (
    <footer className="border-t border-zinc-200 py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-zinc-900">
                <Zap className="h-5 w-5 text-indigo-600" />
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzy</span>
            </Link>
            <nav className="flex gap-6 text-sm text-zinc-600">
                <Link href="/quiz" className="transition-colors hover:text-zinc-900">Play</Link>
                <Link href="/leaderboard" className="transition-colors hover:text-zinc-900">Leaderboard</Link>
            </nav>
            <p className="text-xs text-zinc-500">© 2026 Quizzy. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;
