/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL:process.env.BACKEND_URL,
        NUM_PROBLEMS:process.env.NUM_PROBLEMS,
        DEBUG:process.env.DEBUG,
        MIN_ATTEMPTS: process.env.MIN_ATTEMPTS,
    },
    trailingSlash: false,
    async rewrites() {
        return [
            {
                source: '/api/submit',
                destination: `${process.env.BACKEND_URL}/api/submit`
            },
            {
                source: '/api/consentform',
                destination: `${process.env.BACKEND_URL}/api/consentform`
            },
            {
                source: '/api/register',
                destination: `${process.env.BACKEND_URL}/api/register`
            }
        ]
    }
}

module.exports = nextConfig;
