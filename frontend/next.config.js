/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL:process.env.BACKEND_URL
    },
    trailingSlash: false,
    async rewrites() {
        return [
            {
                source: '/api/submit',
                destination: `${process.env.BACKEND_URL}/api/submit`
            }
        ]
    }
}

module.exports = nextConfig;
