"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

export const Providers = ({ children }: { children: React.ReactNode }) => {
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
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </ClerkProvider>
  );
};
