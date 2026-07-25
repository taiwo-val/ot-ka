import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "speuoorbtclvnkdmphqw.supabase.co",
      },
    ],
  },
};

export default nextConfig;