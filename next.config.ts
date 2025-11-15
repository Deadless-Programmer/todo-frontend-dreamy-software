import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["i.postimg.cc"], // External image domain add করা হলো
  },
};

export default nextConfig;
