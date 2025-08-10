import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname === "/signIn" ||
    pathname === "/signUp" ||
    pathname.startsWith("/auth/")
  ) {
    return NextResponse.next();
  }

  if (!token && pathname.startsWith("/dashboard")) {
    const url = new URL("/auth/signIn", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
