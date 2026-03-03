'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
    const [countdown, setCountdown] = useState(5)
    const router = useRouter()

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push('/')
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [router])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 backdrop-blur-xl shadow-2xl text-center">
                <div className="flex justify-center">
                    <div className="rounded-full bg-emerald-500/20 p-4">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Success!</h1>
                    <p className="text-zinc-400">You have been successfully authenticated.</p>
                </div>

                <div className="py-4">
                    <p className="text-sm text-zinc-500">
                        Redirecting to home in <span className="font-mono text-emerald-500">{countdown}s</span>...
                    </p>
                </div>

                <Link
                    href="/"
                    className="group flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-zinc-200 transition-all font-semibold py-4 rounded-xl text-lg"
                >
                    Go Home Now
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
            </div>
        </div>
    )
}
