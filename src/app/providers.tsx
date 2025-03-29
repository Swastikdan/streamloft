"use client";
import * as React from "react";
import { ThemeProvider } from "next-themes";
import { TRPCReactProvider } from "@/trpc/react";
import { AuthModalProvider } from "@/hooks/use-sign-in";
import { Toaster } from "@/components/ui/sonner";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>
        <React.Suspense fallback={null}>
          <AuthModalProvider>
            {children}
            <Toaster richColors closeButton />
          </AuthModalProvider>
        </React.Suspense>
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
