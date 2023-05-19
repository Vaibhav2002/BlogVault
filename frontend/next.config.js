/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "localhost",
            "lh3.googleusercontent.com",
            "avatars.githubusercontent.com",
            process.env.NEXT_PUBLIC_BACKEND_URL
        ],
        deviceSizes: [600, 900, 1200, 1536]
    }
}

module.exports = nextConfig
