import type { NextConfig } from "next";
import "./src/env.js";
const nextConfig: NextConfig = {
  experimental: {
    // inlineCss: true,
    reactCompiler: true,
    authInterrupts: true,
    // optimizeCss: true, need to install "critters"
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  compress: true,

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
      },
    ],
  },
};

export default nextConfig;
