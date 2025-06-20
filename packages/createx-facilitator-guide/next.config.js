module.exports = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { 
    unoptimized: true,
    domains: ['createx.us']
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};