export type Role = "MANAGER" | "STORE_KEEPER";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type Session = {
  token: string;
  user: User;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  unitPrice: number;
  quantity: number;
  updatedAt: string;
};
