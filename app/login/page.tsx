import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
                    <p className="mt-2 text-zinc-400">Sign in to your account or create a new one</p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" title="password" className="block text-sm font-medium text-zinc-300">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-zinc-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            formAction={login}
                            className="w-full bg-white text-black hover:bg-zinc-200 transition-all font-semibold py-6 text-lg"
                        >
                            Sign In
                        </Button>
                        <Button
                            formAction={signup}
                            variant="outline"
                            className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white transition-all py-6 text-lg"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-zinc-500">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>
        </div>
    )
}
