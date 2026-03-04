import { NextRequest, NextResponse } from "next/server";

import { sampleUsers } from "@/lib/sample-data";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string; password?: string };

  const user = sampleUsers.find(
    (candidate) =>
      candidate.email.toLowerCase() === body.email?.toLowerCase() &&
      candidate.password === body.password
  );

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    token: `token-${user.id}-${Date.now()}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}
