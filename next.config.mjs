/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Moved out of experimental
  outputFileTracingIncludes: {
    "/": ["./lib/**/*"],
  },

  experimental: {
    // ✅ Still valid for bundle optimization
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-select",
      "lucide-react",
    ],
  },
};

export default nextConfig;
