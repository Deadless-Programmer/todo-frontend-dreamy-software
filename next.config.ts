import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "i.postimg.cc",
      "pioneer-alpha-website-django-s3-bucket-new-2.s3.amazonaws.com"
    ],
  },
};

export default nextConfig;
