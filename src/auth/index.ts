import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username, twoFactor, admin } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Authentication configuration for the application
 *
 * This sets up the authentication system with:
 * - Database adapter (Prisma)
 * - Session management
 * - Social providers
 * - Security plugins
 *
 * @see https://better-auth.dev/docs for full documentation
 */
export const auth = betterAuth({
  // Basic application configuration
  appName: "inkflow",

  // Database configuration using Prisma adapter
  database: prismaAdapter(db, {
    provider: "postgresql", // Specifies we're using PostgreSQL
  }),

  // Session management settings
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 2 * 60, // Cache duration in seconds (2 minutes)
    },
  },

  // Social authentication providers
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    // Additional providers can be added here
    // github: {...},
    // facebook: {...},
  },

  // Authentication plugins and security features
  plugins: [
    // Next.js cookie management
    nextCookies(),

    // Username configuration
    username({
      minUsernameLength: 5, // Minimum username length
      maxUsernameLength: 100, // Maximum username length
      usernameValidator: (username) => {
        // Prevent usernames starting with "admin"
        return !/^admin\b/i.test(username);
      },
    }),

    // Two-factor authentication
    twoFactor(),

    // Admin role management
    admin(),

    // Passkey (WebAuthn) authentication
    passkey(),

    // Additional plugins can be added here
    // emailVerification(),
    // rateLimiting(),
  ],
});

/**
 * Type exports for authentication
 * These can be used throughout the application for type safety
 */
export type Auth = typeof auth;
export type AuthUser = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>["user"];
export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
