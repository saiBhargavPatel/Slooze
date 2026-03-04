import { initialProducts } from "@/lib/sample-data";
import { Product } from "@/lib/types";

const productsStore: Product[] = [...initialProducts];

export const getProductsStore = () => productsStore;
