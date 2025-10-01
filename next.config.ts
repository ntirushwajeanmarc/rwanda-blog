import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
  /* config options here */
};

export default nextConfig;
