"use server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * Creates a TRPC context specifically for RSC (React Server Components)
 *
 * This function:
 * - Wraps the standard createTRPCContext
 * - Adds RSC-specific headers
 * - Uses React cache for performance optimization
 *
 * @returns {Promise<TRPCContext>} The created TRPC context
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc"); // Identify RSC calls

  return createTRPCContext({
    headers: heads,
  });
});

/**
 * Cached instance of the QueryClient for RSC
 * Uses the same configuration as client-side but with server-specific optimizations
 */
const getQueryClient = cache(createQueryClient);

/**
 * TRPC caller instance for RSC
 * Creates a caller with the RSC-specific context
 */
const caller = createCaller(createContext);

/**
 * TRPC RSC helpers
 *
 * Provides:
 * - api: The TRPC client instance for RSC
 * - HydrateClient: Component for hydrating client components with server data
 *
 * @remarks
 * The ts-expect-error is used because createHydrationHelpers expects a slightly different
 * type than what createCaller returns. This is safe in practice as the types are compatible.
 */
export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  // @ts-expect-error - Type mismatch between createCaller and expected type
  caller,
  getQueryClient,
);
