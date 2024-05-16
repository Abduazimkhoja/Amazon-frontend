import Home from '@/app/Home'
import { ProductService } from '@/services/product/product.service'
import type { Metadata } from 'next'
import type { FC } from 'react'

export const metadata: Metadata = {
	title: 'Amazon Clone - Your Online Marketplace for Everything',
	description:
		'Discover a wide range of products at our Amazon Clone online marketplace. Shop electronics, fashion, home goods, and more with seamless navigation and user-friendly features.',
	authors: [{ name: 'Abduazimkhoja', url: 'https://github.com/Abduazimkhoja' }],
	openGraph: {
		title: 'Amazon Clone - Your Online Marketplace for Everything',
		description:
			'Discover a wide range of products at our Amazon Clone online marketplace. Shop electronics, fashion, home goods, and more with seamless navigation and user-friendly features.',
		url: 'https://amazon-v01.vercel.app',
		siteName: 'Next.js',
		images: [
			{
				url: 'https://i.postimg.cc/HL089d3T/amazon-1440x1700-rounded-minify.webp',
				width: 1440,
				height: 1700
			}
		],
		locale: 'en_US',
		type: 'website'
	}
}

export const revalidate = 60

// REQUEST
async function getProducts() {
	const data = await ProductService.getAll({
		minify: true,
		page: 1,
		perPage: 8,
		ratings: ''
	})

	return data
}
// PAGE
const HomePage: FC = async () => {
	const { products, length } = await getProducts()

	return <Home products={products} length={length} />
}

export default HomePage
