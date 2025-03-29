import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

/**
 * Creates a configured QueryClient instance with optimized defaults for SSR applications.
 *
 * Features:
 * - SuperJSON serialization/deserialization for enhanced data handling
 * - Optimized staleTime for SSR scenarios
 * - Custom hydration/dehydration logic
 *
 * @returns {QueryClient} A fully configured QueryClient instance
 *
 * @example
 * // In your server components:
 * const queryClient = createQueryClient();
 *
 * // In your client components:
 * <QueryClientProvider client={queryClient}>
 *   {/* Your app * /}
 * </QueryClientProvider>
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * With SSR, we set a default staleTime to avoid immediate client-side refetching
         * of data that was just server-rendered. 30 seconds provides a good balance
         * between freshness and performance.
         */
        staleTime: 30 * 1000, // 30 seconds

        /**
         * Additional recommended defaults for SSR:
         */
        refetchOnWindowFocus: false,
        retry: false,
      },
      dehydrate: {
        /**
         * Use SuperJSON for serialization to handle complex JavaScript types
         * like Dates, Maps, Sets, etc. during dehydration.
         */
        serializeData: SuperJSON.serialize,

        /**
         * Custom hydration logic that includes both:
         * - The default hydration rules
         * - Any queries that are still pending (useful for SSR)
         */
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        /**
         * Use SuperJSON for deserialization to properly reconstruct
         * complex types on the client side.
         */
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
};
