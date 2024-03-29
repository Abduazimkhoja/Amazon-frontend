'use client'

import { OrderService } from '@/services/order.service'
import Heading from '@/ui/Heading'
import Layout from '@/ui/layout/Layout'
import { convertPrice } from '@/utils/convertPrice'
import { useQuery } from '@tanstack/react-query'

interface IMyOrders {}

export default function MyOrders({}: IMyOrders) {
	const { data: orders } = useQuery({
		queryKey: ['my orders'],
		queryFn: async () => {
			try {
				const response = await OrderService.getAll()
				return response.data
			} catch (error) {
				console.log(error)
				throw new Error('Failed to fetch profile data')
			}
		}
	})

	return (
		<Layout>
			<Heading>My Orders!</Heading>

			<section>
				{orders?.length ? (
					orders?.map(order => (
						<div
							key={order.id}
							className='rounded-lg bg-white shadow flex gap-10 p-7 my-7'
						>
							<span>{order.id}</span>
							<span>{order.status}</span>
							<span>
								{new Date(order.createdAt).toLocaleDateString('ru-Ru')}
							</span>
							<span>{convertPrice(order.total)}</span>
						</div>
					))
				) : (
					<div>Order not found!</div>
				)}
			</section>
		</Layout>
	)
}
