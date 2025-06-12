// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Image optimization configuration
    images: {
        domains: ['localhost', 'cms.createx.io'],
        formats: ['image/webp', 'image/avif'],
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
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
                source: '/docs',
                destination: '/documentation',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
