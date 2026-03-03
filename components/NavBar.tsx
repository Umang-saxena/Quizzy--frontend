"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Trophy, Gamepad2, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signout } from "@/app/login/actions";
import { Button } from "./ui/button";

const Navbar = () => {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const links = [
        { to: "/quiz", label: "Play", icon: Gamepad2 },
        { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    ];

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
            <div className="container flex h-16 items-center justify-between px-4 mx-auto">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-100">
                    <Zap className="h-5 w-5 text-indigo-600" />
                    <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Quizzy</span>
                </Link>

                <nav className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                href={link.to}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === link.to
                                        ? "bg-indigo-500/20 text-indigo-300"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                                    }`}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-100">
                                <User className="h-4 w-4 text-indigo-400" />
                                <span className="text-sm font-medium pt-0.5">
                                    {user.email.split('@')[0]}
                                </span>
                            </div>
                            <form action={signout}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10 gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200"
                        >
                            <User className="h-4 w-4" />
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
