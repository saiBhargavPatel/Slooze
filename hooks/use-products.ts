"use client";

import { useCallback, useEffect, useState } from "react";

import { createProduct, fetchProducts, updateProduct } from "@/lib/products";
import { Product } from "@/lib/types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = async (payload: Omit<Product, "id" | "updatedAt">) => {
    const created = await createProduct(payload);
    setProducts((prev) => [created, ...prev]);
  };

  const editProduct = async (
    id: string,
    payload: Omit<Product, "id" | "updatedAt">
  ) => {
    const updated = await updateProduct(id, payload);
    setProducts((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  return {
    products,
    loading,
    addProduct,
    editProduct,
    reload: loadProducts
  };
};
