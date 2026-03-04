import { initialProducts } from "@/lib/sample-data";
import { Product } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const fetchProducts = async (): Promise<Product[]> => {
  const endpoint = `${API_BASE}/api/products`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });

    if (!response.ok) throw new Error("Failed to fetch products");
    return (await response.json()) as Product[];
  } catch {
    return initialProducts;
  }
};

export const createProduct = async (
  payload: Omit<Product, "id" | "updatedAt">
): Promise<Product> => {
  const response = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return (await response.json()) as Product;
};

export const updateProduct = async (
  id: string,
  payload: Omit<Product, "id" | "updatedAt">
): Promise<Product> => {
  const response = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return (await response.json()) as Product;
};
