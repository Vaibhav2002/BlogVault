/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "localhost",
            "lh3.googleusercontent.com",
            "avatars.githubusercontent.com",
            'api.blogvault.vaibhavjaiswal.tech'
        ],
        deviceSizes: [600, 900, 1200, 1536]
    }
}

module.exports = nextConfig
