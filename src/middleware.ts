import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { MODAL_QUERY_PARAM, CALLBACK_URL_QUERY_PARAM } from "@/constants";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {});

  if (!sessionCookie) {
    // open auth modal if not logged in
    return NextResponse.redirect(
      new URL(
        request.nextUrl.origin +
          `?${MODAL_QUERY_PARAM}=true&${CALLBACK_URL_QUERY_PARAM}=${request.nextUrl.pathname}`,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/watchlist/:path*",
    "/favorites/:path*",
    "/details/:path*",
  ],
};
