import type { NextConfig } from "next";
import "@/env";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    reactCompiler: true,
  },

  // typescript: {
  //   ignoreBuildErrors: true,
  // },

  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  compress: true,

  poweredByHeader: false,

  images: {
    minimumCacheTTL: 31536000,
    loader: "default",
    deviceSizes: [320, 420, 768, 1024, 1200, 1920, 2048],
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
    ],
  },

  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
  ],
};

export default nextConfig;
