import { useActions } from '@/hooks/useActions'
import type { FC } from 'react'
import { BsCaretLeftSquare, BsCaretRightSquare } from 'react-icons/bs'
import styles from './Carousel.module.scss'

const CarouselNavigation: FC = () => {
	const { nextSlide, prevSlide } = useActions()
	return (
		<div className={styles.nav}>
			<button onClick={() => prevSlide({ carouselLength: 2 })}>
				<BsCaretLeftSquare />
			</button>
			<button onClick={() => nextSlide({ carouselLength: 2 })}>
				<BsCaretRightSquare />
			</button>
		</div>
	)
}

export default CarouselNavigation
