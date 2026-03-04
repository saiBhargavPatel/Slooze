import { NextRequest, NextResponse } from "next/server";

import { getProductsStore } from "@/lib/mock-store";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = (await request.json()) as {
    name: string;
    category: string;
    unitPrice: number;
    quantity: number;
  };

  const products = getProductsStore();
  const existing = products.find((product) => product.id === id);

  if (!existing) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  existing.name = body.name;
  existing.category = body.category;
  existing.unitPrice = Number(body.unitPrice);
  existing.quantity = Number(body.quantity);
  existing.updatedAt = new Date().toISOString();

  return NextResponse.json(existing);
}
