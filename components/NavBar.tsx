"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Trophy, Gamepad2 } from "lucide-react";

const Navbar = () => {
    const pathname = usePathname();

    const links = [
        { to: "/quiz", label: "Play", icon: Gamepad2 },
        { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    ];

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900">
                    <Zap className="h-5 w-5 text-indigo-600" />
                    <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzy</span>
                </Link>

                <nav className="flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            href={link.to}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                pathname === link.to
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                            }`}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
