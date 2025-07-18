// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-950 to-black p-6 text-white">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 drop-shadow-md tracking-tight">
          App Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          A community powered driven SaaS platform.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 pt-2">
          <Link
            href="/login"
            className="px-6 py-2 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </main>
  );
}
