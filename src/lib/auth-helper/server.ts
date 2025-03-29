"use server";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { cache } from "react";

/**
 * Server-side session helper
 *
 * Provides cached access to the current user's session data.
 * This function is marked as "server-only" to prevent accidental client-side usage.
 *
 * @returns {Promise<Session | null>} The current user's session or null if not authenticated
 * @throws {Error} If there's an issue fetching the session
 *
 * @example
 * const session = await getSession();
 * if (!session) {
 *   // Handle unauthenticated user
 * }
 */
const getSession = cache(async () => {
  // Get the current headers from the request
  const requestHeaders = await headers();

  // Fetch and return the session using the auth library
  return await auth.api.getSession({
    headers: requestHeaders,
  });
});

export { getSession };
