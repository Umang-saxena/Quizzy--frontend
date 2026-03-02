import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-zinc-900">404</h1>
        <p className="mb-4 text-xl text-zinc-600">Oops! Page not found</p>
        <Link href="/" className="font-medium text-indigo-700 underline hover:text-indigo-600">
          Return to Home
        </Link>
      </div>
    </section>
  );
}
