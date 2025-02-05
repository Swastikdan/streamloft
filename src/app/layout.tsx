import { type Metadata } from "next";

import "@/styles/globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
const baricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baricolage",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title:
    "Stremloft | Enjoy popular movies and TV shows. Watch anytime, anywhere. Start your free trial.",
  description:
    "Watch now on Stremloft for a wide selection of movies, TV shows, live TV, and sports. Stream high-quality content anytime on any device.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title:
      "Stremloft | Enjoy popular movies and TV shows. Watch anytime, anywhere. Start your free trial.",
    description:
      "Watch now on Stremloft for a wide selection of movies, TV shows, live TV, and sports. Stream high-quality content anytime on any device.",
    type: "website",
    url: "https://stremloft.vercel.app",
    images: [
      {
        url: "https://stremloft.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stremloft | Enjoy popular movies and TV shows. Watch anytime, anywhere. Start your free trial.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body className={`${baricolage.variable} font-baricolage antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
