/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
//    assetPrefix: `${process.env.BACKEND_URL}`,
    env: {
        BACKEND_URL:process.env.BACKEND_URL
    },
//    async rewrites() {
//        return [
//            {
//                source: '/api/submit/',
//                destination: `${process.env.BACKEND_URL}/api/submit/`
//
//            }
//        ]
//    }
}
