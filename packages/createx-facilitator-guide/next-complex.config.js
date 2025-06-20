// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Type checking is bypassed with the SKIP_TYPECHECK environment variable
    typescript: {
        // This will be ignored when NEXT_DISABLE_TYPESCRIPT_CHECKS is true
        // But provides a proper suggestion for developers
        ignoreBuildErrors: process.env.SKIP_TYPECHECK === 'true',
    },
    reactStrictMode: true,

    // Skip static optimization for error pages to avoid React error #31
    generateBuildId: async () => {
        return 'build-' + Date.now();
    },

    // Disable static generation for error pages to avoid React error #31
    output: 'export',
    trailingSlash: true,
    distDir: '.next',

    // Image optimization configuration
    images: {
        domains: ['localhost', 'facilitator.createx.io', 'createx.us'],
        formats: ['image/webp', 'image/avif'],
        unoptimized: process.env.NODE_ENV === 'production', // Disable image optimization during build
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'CreateX Facilitator Guide',
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002',
    },

    // Build configuration
    eslint: {
        dirs: ['app', 'components', 'lib', 'utils'],
    },

    // Performance optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Headers for security and performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // Redirects
    async redirects() {
        return [
            {
                source: '/guide',
                destination: '/modules',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
