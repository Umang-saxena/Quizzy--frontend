'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const message = searchParams.get('message') || "We couldn't process your request. Please try again later."

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white text-center">
            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-red-500">Authentication Error</h1>
                <p className="mt-4 text-zinc-400">
                    {message}
                </p>
                <Link
                    href="/login"
                    className="mt-8 inline-block px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    )
}
