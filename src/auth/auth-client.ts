import { createAuthClient } from "better-auth/react";
import {
  usernameClient,
  twoFactorClient,
  adminClient,
} from "better-auth/client/plugins";
import { env } from "@/env";

/**
 * Client-side authentication configuration
 *
 * Creates an authentication client with:
 * - Base application URL
 * - Authentication plugins
 * - Session management
 *
 * @see https://better-auth.dev/docs/client for full documentation
 */
export const authClient = createAuthClient({
  // Base URL for authentication endpoints
  baseURL: env.NEXT_PUBLIC_APP_URL,

  // Authentication plugins
  plugins: [
    // Username/password authentication
    usernameClient(),

    // Two-factor authentication support
    twoFactorClient(),

    // Admin role management
    adminClient(),

    // Additional client plugins can be added here
    // passkeyClient(),
    // oauthClient(),
  ],
});

/**
 * Core authentication methods
 * These are the primary exports used throughout the application
 */
export const {
  signIn, // User sign-in functionality
  signOut, // User sign-out functionality
  signUp, // User registration functionality
  useSession, // React hook for session access
  admin, // Admin-specific methods
} = authClient;

/**
 * Session state listener
 * Can be used to react to session changes globally
 */
authClient.$store.listen("$sessionSignal", () => {
  // Example session change handler:
  // console.log("Session state changed:", newSession);
  // Can be used to:
  // - Trigger analytics events
  // - Update global state
  // - Show notifications
});

/**
 * Type exports for client-side authentication
 * These can be used throughout the application for type safety
 */
export type AuthClient = typeof authClient;
export type AuthSession = ReturnType<typeof authClient.getSession>;
