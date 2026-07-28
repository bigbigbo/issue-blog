import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME,
    GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER,
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "private-user-images.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
