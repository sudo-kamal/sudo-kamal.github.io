/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Allow any path on this hostname
      },
    ],
  },
  // Add other Next.js configurations if needed
  // For example, images configuration:
  // images: {
  //   domains: ['example.com'], // Add domains for external images
  // },
}

module.exports = nextConfig 