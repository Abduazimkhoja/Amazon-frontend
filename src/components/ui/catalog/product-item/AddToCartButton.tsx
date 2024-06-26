import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/types/product.interface'
import type { FC } from 'react'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

const AddToCartButton: FC<{ product: IProduct }> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	const addCart = () =>
		currentElement
			? removeFromCart({ id: currentElement.id })
			: addToCart({ product, quantity: 1, price: product.price })

	return (
		<button onClick={addCart} className='text-secondary'>
			{currentElement ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
		</button>
	)
}

export default AddToCartButton
