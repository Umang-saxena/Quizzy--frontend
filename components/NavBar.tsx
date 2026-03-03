"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Trophy, Gamepad2, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signout } from "@/app/login/actions";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

const router = useRouter();

useEffect(() => {
    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
            router.refresh();
        }
    });

    return () => subscription.unsubscribe();
}, [supabase, router]);

const links = [
    { to: "/quiz", label: "Play", icon: Gamepad2 },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto font-sans">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                <Zap className="h-5 w-5 text-indigo-600" />
                <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzy</span>
            </Link>

            <nav className="flex items-center gap-2 md:gap-4">
                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            href={link.to}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === link.to
                                ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                                }`}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

                <ModeToggle />

                {user ? (
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
                            <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm font-medium pt-0.5 hidden sm:inline">
                                {user.email.split('@')[0]}
                            </span>
                        </div>
                        <form action={signout}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 dark:text-zinc-400 dark:hover:text-red-400 gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden lg:inline">Logout</span>
                            </Button>
                        </form>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                        <User className="h-4 w-4" />
                        <span className="pt-0.5">Login</span>
                    </Link>
                )}
            </nav>
        </div>
    </header>
);
};

export default Navbar;
