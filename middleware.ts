import { NextRequest, NextResponse } from "next/server";

import { parseSession, SESSION_COOKIE } from "@/lib/session";

const authRoutes = ["/login"];
const protectedRoutes = ["/dashboard", "/products"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieValue = request.cookies.get(SESSION_COOKIE)?.value;
  const session = parseSession(cookieValue);

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuth = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuth && session) {
    const destination = session.user.role === "MANAGER" ? "/dashboard" : "/products";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (pathname.startsWith("/dashboard") && session?.user.role !== "MANAGER") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/products/:path*"]
};
