/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL,
	},
	images: {
		domains: [
			'ae01.alicdn.com',
			'picsum.photos',
			'loremflickr.com',
			'avatars.githubusercontent.com',
			'cloudflare-ipfs.com',
		]
	},
  async rewrites() {
    return [{
      source: `/uploads/:path*`,
      destination: 'http://localhost:4200/uploads/:path*'
    }]
  }
}

module.exports = nextConfig
