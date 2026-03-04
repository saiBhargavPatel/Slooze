import { Product, User } from "@/lib/types";

export const sampleUsers: Array<User & { password: string }> = [
  {
    id: "u_1",
    name: "Aarav Sharma",
    email: "manager@slooze.com",
    password: "Manager@123",
    role: "MANAGER"
  },
  {
    id: "u_2",
    name: "Priya Nair",
    email: "store@slooze.com",
    password: "Store@123",
    role: "STORE_KEEPER"
  }
];

export const initialProducts: Product[] = [
  {
    id: "p_1",
    name: "Arabica Coffee Beans",
    category: "Beverage",
    unitPrice: 125,
    quantity: 240,
    updatedAt: "2026-03-01T10:00:00.000Z"
  },
  {
    id: "p_2",
    name: "Basmati Rice",
    category: "Grains",
    unitPrice: 320,
    quantity: 250,
    updatedAt: "2026-03-02T09:15:00.000Z"
  },
  {
    id: "p_3",
    name: "Raw Sugar",
    category: "Sweetener",
    unitPrice: 45,
    quantity: 520,
    updatedAt: "2026-03-03T14:22:00.000Z"
  },
  {
    id: "p_4",
    name: "Sunflower Oil",
    category: "Cooking",
    unitPrice: 198,
    quantity: 305,
    updatedAt: "2026-03-04T08:05:00.000Z"
  }
];
