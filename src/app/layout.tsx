import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

export const metadata: Metadata = {
  title:
    "Stremloft | Enjoy popular movies and TV shows. Watch anytime, anywhere. Start your free trial.",
  description:
    "Watch now on Stremloft for a wide selection of movies, TV shows, live TV, and sports. Stream high-quality content anytime on any device.",
  icons: [
    {
      rel: "icon",
      url: "https://ik.imagekit.io/swastikdan/streamloft/public/favicon.ico",
    },
  ],
  openGraph: {
    title:
      "Stremloft | Enjoy popular movies and TV shows. Watch anytime, anywhere. Start your free trial.",
    description:
      "Watch now on Stremloft for a wide selection of movies, TV shows, live TV, and sports. Stream high-quality content anytime on any device.",
    type: "website",
    url: "https://stremloft.vercel.app",
    images: [
      {
        url: "https://ik.imagekit.io/swastikdan/streamloft/public/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stremloft | Enjoy popular movies and TV shows. Watch anytime, anywhere. Start your free trial.",
      },
    ],
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <Providers>
        <body> {children}</body>
      </Providers>
    </html>
  );
}
