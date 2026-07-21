import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Pin the workspace root so Next.js doesn't infer a stray parent-directory
  // lockfile as the root (which breaks production output file tracing).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
