"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HTTPException } from "hono/http-exception";
import { PropsWithChildren, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { toast } from "sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof HTTPException) {
              toast.error("An error occurred while fetching data");
            }
          },
        }),
      }),
  );

  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        layout: {
          logoImageUrl: "/logo_main.svg",
          logoLinkUrl: "/",
          logoPlacement: "inside",
          socialButtonsVariant: "blockButton",
        },
        variables: {
          borderRadius: "0rem",
          colorPrimary: "hsl(240 5.9% 10%)",
        },
        elements: {
          cardBox: {
            boxShadow: "none",
            border: "2px solid hsl(var(--border))",
          },

          userButtonPopoverCard: {
            boxShadow: "none",
            border: "2px solid hsl(var(--border))",
          },
          userButtonBox: {
            width: "40px",
            height: "40px",
          },
          userButtonAvatarBox: {
            width: "40px",
            height: "40px",
          },
        },
      }}
      experimental={{
        persistClient: true,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClerkProvider>
  );
};
