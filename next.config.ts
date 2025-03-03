import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "aceternity.com",
      "assets.aceternity.com",
      "cdn.sanity.io",
      "pbs.twimg.com",
    ],
  },
};

export default nextConfig;
