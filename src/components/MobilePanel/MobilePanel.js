import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import styled from 'styled-components'
import SwiperInfo from './SwiperInfo'

SwiperCore.use(Pagination)

const MobilePanel = ({ spatialData, imageOpenHandler }) => {
	const [open, setOpen] = useState(false)
	const [currentSwipe, setCurrentSwipe] = useState(null)

	useEffect(() => {
		onSlideChange()
	}, [])

	console.log('spatialllllll', spatialData)
	const slides = []

	spatialData.data?.map.features.map(el =>
		slides.push(
			<SwiperSlide key={el.properties.id}>{el.properties.title}</SwiperSlide>
		)
	)

	// const onSwipeHandler = target => {
	// 	target.slides.map(slide => {
	// 		console.log('SLIDE', slide)
	// 		if (slide.classList.contains('swiper-slide swiper-slide-active')) {
	// 			console.log('si')
	// 		}
	// 	})
	// }

	const sliderRef = useRef(null)

	const onSlideChange = () => {
		// console.log(sliderRef)
		// sliderRef.current.slideTo(2)
		// sliderRef.current.swiper.slideTo(2)
		const currentSwipe = setTimeout(() => {
			const currentEl = document.querySelector('.swiper-slide-active')
			console.log('CURRENT', currentEl)

			const currentValue = currentEl.innerHTML
			console.log('currentValue', currentValue)

			const currentSwipe = spatialData.data?.map.features.find(
				el => el.properties.title === currentValue
			)
			console.log(currentSwipe)
			setCurrentSwipe(currentSwipe)
		}, 250)

		return () => {
			clearTimeout(currentSwipe)
		}
	}

	const onSlideClick = e => {
		console.log('click', e)
		// e.slideTo(2)
		setOpen(true)
	}

	return (
		<>
			<StyledSlider
				ref={sliderRef}
				onClick={onSlideClick}
				pagination
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={onSlideChange}>
				{slides}
			</StyledSlider>
			<SwiperInfo
				info={currentSwipe}
				open={open}
				setOpen={setOpen}
				imageOpenHandler={imageOpenHandler}
				fontColor={spatialData.data?.style.fontColor}
			/>
		</>
	)
}

export default MobilePanel

const StyledSlider = styled(Swiper)`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 60px;
	background: #ffffffb0;

	& > div > div {
		display: flex;
		justify-content: center;
		margin-top: 10px;
	}
`
