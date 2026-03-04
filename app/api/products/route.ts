import { NextRequest, NextResponse } from "next/server";

import { getProductsStore } from "@/lib/mock-store";

export async function GET() {
  return NextResponse.json(getProductsStore());
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    name: string;
    category: string;
    unitPrice: number;
    quantity: number;
  };

  const product = {
    id: `p_${Math.random().toString(36).slice(2, 8)}`,
    name: body.name,
    category: body.category,
    unitPrice: Number(body.unitPrice),
    quantity: Number(body.quantity),
    updatedAt: new Date().toISOString()
  };

  getProductsStore().unshift(product);
  return NextResponse.json(product, { status: 201 });
}
