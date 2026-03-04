import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <article className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You do not have permission to open this page.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Go to Products
        </Link>
      </article>
    </main>
  );
}
