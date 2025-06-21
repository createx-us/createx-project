/** @type {import('next').NextConfig} */
const nextConfig = {
    // Skip TypeScript errors during build
    typescript: {
        ignoreBuildErrors: process.env.SKIP_TYPECHECK === 'true',
    },

    // Skip ESLint during build to avoid blocking
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Minimal image config
    images: {
        domains: ['localhost', 'facilitator.createx.io', 'createx.us'],
        unoptimized: true,
    },

    // Disable static optimization entirely
    experimental: {
        runtime: 'nodejs',
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'CreateX Facilitator Guide',
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002',
    },
};

module.exports = nextConfig;
