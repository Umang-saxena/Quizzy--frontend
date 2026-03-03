import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-zinc-100">404</h1>
        <p className="mb-4 text-xl text-zinc-300">Oops! Page not found</p>
        <Link href="/" className="font-medium text-indigo-300 underline hover:text-indigo-200">
          Return to Home
        </Link>
      </div>
    </section>
  );
}
