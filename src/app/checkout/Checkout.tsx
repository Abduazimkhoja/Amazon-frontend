'use client'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { OrderService } from '@/services/order.service'
import { IProduct } from '@/types/product.interface'
import Heading from '@/ui/Heading'
import Button from '@/ui/button/Button'
import ProductItem from '@/ui/catalog/product-item/ProductItem'
import { convertPrice } from '@/utils/convertPrice'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import styles from './Checkout.module.scss'
import CheckoutItem from './CheckoutItem'

const Checkout: FC<{ products: IProduct[] }> = ({ products = [] }) => {
	const { items, total } = useCart()

	const { reset } = useActions()

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['create order and payment'],
		mutationFn: () =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		onSuccess({ data }) {
			reset()
			push(data.confirmation.confirmation_url)
		}
	})

	return (
		<>
			{items.length ? (
				<section className={styles.checkout}>
					<div>
						<Heading className='mb-6'>Checkout</Heading>
						<div className={styles.list}>
							{items.map(item => (
								<CheckoutItem key={item.id} product={item.product} />
							))}
						</div>
						<div className={styles.footer}>
							<div className={styles.total}>
								<div>Total Cost</div>
								<div>{convertPrice(total)}</div>
							</div>
							<Button
								option='white'
								size='lg'
								className='mt-5 mb-2'
								onClick={() => mutate()}
							>
								Place order
							</Button>
						</div>
					</div>
					<div>
						<Heading className='mb-6 text-2x1'>Recommended products</Heading>
						<div className={styles.recommended}>
							{products
								.filter(
									product =>
										!items.map(item => item.product.id).includes(product.id)
								)
								.slice(0, 2)
								.map(product => (
									<ProductItem product={product} key={product.id} />
								))}
						</div>
					</div>
				</section>
			) : null}
		</>
	)
}

export default Checkout
