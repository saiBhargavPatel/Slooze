"use client";

import { useMemo } from "react";

import { useProducts } from "@/hooks/use-products";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

export default function DashboardPage() {
  const { products, loading } = useProducts();

  const stats = useMemo(() => {
    const totalInventory = products.reduce((acc, item) => acc + item.quantity, 0);
    const totalValue = products.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const lowStock = products.filter((item) => item.quantity < 300).length;

    return {
      totalInventory,
      totalValue,
      lowStock
    };
  }, [products]);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Manager Dashboard</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Overview of commodities across categories.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Total Products</p>
          <p className="mt-2 text-3xl font-bold">{loading ? "..." : products.length}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Inventory Units</p>
          <p className="mt-2 text-3xl font-bold">{loading ? "..." : stats.totalInventory}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Inventory Value</p>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "..." : currency.format(stats.totalValue)}
          </p>
        </article>
      </div>

      <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
        <p className="font-semibold text-amber-800 dark:text-amber-300">Low Stock Alert</p>
        <p className="text-sm text-amber-700 dark:text-amber-200">
          {loading ? "Analyzing inventory..." : `${stats.lowStock} item(s) are below the recommended quantity threshold.`}
        </p>
      </article>
    </section>
  );
}
