/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    trailingSlash: true,
    images: {
        domains: ['localhost', 'facilitator.createx.io', 'createx.us'],
        unoptimized: true,
    },
}

module.exports = nextConfig
