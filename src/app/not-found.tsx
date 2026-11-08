import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0F] px-6 text-center text-white">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-white/70">The page you were looking for does not exist or has moved.</p>
        <Link href="/en" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-sm font-medium text-white">
          Return home
        </Link>
      </div>
    </main>
  );
}
