/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        // Disable persistent caching to avoid M: drive rename issues
        config.cache = false;
        return config;
    },
};

module.exports = nextConfig;
