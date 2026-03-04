"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("manager@slooze.com");
  const [password, setPassword] = useState("Manager@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const session = await login(email, password);
      router.replace(session.user.role === "MANAGER" ? "/dashboard" : "/products");
    } catch {
      setError("Invalid credentials. Try sample users listed below.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-100 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">Slooze</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">Login</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Access commodities manager portal.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-teal-600 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@slooze.com"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Password
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-teal-600 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </label>

          {error ? (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal-600 px-3 py-2 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800">
          <p className="font-semibold">Sample credentials</p>
          <p>Manager (Aarav Sharma): manager@slooze.com / Manager@123</p>
          <p>Store Keeper (Priya Nair): store@slooze.com / Store@123</p>
        </div>
      </div>
    </main>
  );
}
