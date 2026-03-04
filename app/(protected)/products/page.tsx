"use client";

import { FormEvent, useMemo, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useProducts } from "@/hooks/use-products";
import { Product } from "@/lib/types";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

const emptyForm = {
  name: "",
  category: "",
  unitPrice: "",
  quantity: ""
};

export default function ProductsPage() {
  const { role } = useAuth();
  const { products, loading, addProduct, editProduct } = useProducts();

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const heading = useMemo(
    () => (editId ? "Edit Product" : "Add Product"),
    [editId]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.category || !form.unitPrice || !form.quantity) return;

    setSubmitting(true);

    const payload = {
      name: form.name,
      category: form.category,
      unitPrice: Number(form.unitPrice),
      quantity: Number(form.quantity)
    };

    try {
      if (editId) {
        await editProduct(editId, payload);
      } else {
        await addProduct(payload);
      }
      setForm(emptyForm);
      setEditId(null);
    } finally {
      setSubmitting(false);
    }
  };

  const populateEdit = (product: Product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      unitPrice: String(product.unitPrice),
      quantity: String(product.quantity)
    });
  };

  return (
    <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">All Products</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Accessible to Manager and Store Keeper.
            </p>
          </div>
          <button
            type="button"
            disabled={role !== "MANAGER"}
            className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
            title={
              role === "MANAGER"
                ? "Manager-only feature"
                : "Only Manager can access dashboard insights"
            }
          >
            Dashboard Insights (Manager)
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-2" colSpan={5}>
                    Loading products...
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="p-2 font-medium">{product.name}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">{currency.format(product.unitPrice)}</td>
                    <td className="p-2">{product.quantity}</td>
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => populateEdit(product)}
                        className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-semibold">{heading}</h3>
        <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
          <input
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Unit price"
            value={form.unitPrice}
            onChange={(e) => setForm((prev) => ({ ...prev, unitPrice: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800"
          />
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
            >
              {submitting ? "Saving..." : editId ? "Update" : "Create"}
            </button>
            {editId ? (
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
                onClick={() => {
                  setForm(emptyForm);
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </aside>
    </section>
  );
}
