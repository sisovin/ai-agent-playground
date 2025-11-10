/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
    reactStrictMode: true,
    // Suppress hydration warnings caused by browser extensions
    webpack: (config) => {
        config.infrastructureLogging = { level: 'error' };
        return config;
    },
};

module.exports = nextConfig;