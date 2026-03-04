"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-provider";

const matchClass = (active: boolean) =>
  active
    ? "bg-teal-600 text-white dark:bg-teal-500"
    : "text-slate-700 hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-800";

export const NavShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, session } = useAuth();

  const canAccessDashboard = session?.user.role === "MANAGER";

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">Slooze</p>
            <h1 className="text-lg font-bold">Commodities Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-md border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Menu</p>
          <nav className="space-y-2">
            {canAccessDashboard ? (
              <Link
                href="/dashboard"
                className={`block rounded-md px-3 py-2 text-sm font-medium ${matchClass(pathname === "/dashboard")}`}
              >
                Dashboard
              </Link>
            ) : null}
            <Link
              href="/products"
              className={`block rounded-md px-3 py-2 text-sm font-medium ${matchClass(pathname === "/products")}`}
            >
              Products
            </Link>
          </nav>
          <div className="mt-5 rounded-md bg-slate-100 p-3 text-xs dark:bg-slate-800">
            <p className="font-semibold">Signed in as</p>
            <p>{session?.user.name}</p>
            <p className="text-slate-500 dark:text-slate-400">{session?.user.role}</p>
          </div>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
};
