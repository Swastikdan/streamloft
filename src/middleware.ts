import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { MODAL_QUERY_PARAM, CALLBACK_URL_QUERY_PARAM } from "@/constants";

/**
 * Authentication middleware for Next.js
 *
 * This middleware checks for a valid session cookie on protected routes.
 * If no session is found, it redirects to the homepage with authentication modal parameters.
 *
 * @param request - The incoming Next.js request object
 * @returns NextResponse - Either continues to the requested page or redirects to auth
 */
export async function middleware(request: NextRequest) {
  // Get session cookie from the request
  const sessionCookie = getSessionCookie(request, {});

  if (!sessionCookie) {
    // User is not authenticated - redirect to home with auth modal and callback URL
    const redirectUrl = new URL(request.nextUrl.origin);
    redirectUrl.searchParams.set(MODAL_QUERY_PARAM, "true");
    redirectUrl.searchParams.set(
      CALLBACK_URL_QUERY_PARAM,
      request.nextUrl.pathname,
    );

    return NextResponse.redirect(redirectUrl);
  }

  // User is authenticated - proceed to requested page
  return NextResponse.next();
}

/**
 * Middleware configuration
 * Specifies the paths this middleware should run on
 */
export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/watchlist/:path*",
    "/favorites/:path*",
    "/details/:path*",
  ],
};
