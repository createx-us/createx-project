const { setupDevPlatform } = require('@cloudflare/next-on-pages/next-dev');

// Configure for Cloudflare Pages
if (process.env.NODE_ENV === 'development') {
    setupDevPlatform();
}

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
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
};