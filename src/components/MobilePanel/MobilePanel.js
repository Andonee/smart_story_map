import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import styled from 'styled-components'
import SwiperInfo from './SwiperInfo'

SwiperCore.use(Pagination)

const MobilePanel = ({ spatialData, imageOpenHandler, selectedPlace }) => {
	const [open, setOpen] = useState(false)
	const [currentSwipe, setCurrentSwipe] = useState(null)
	const sliderRef = useRef(null)

	useEffect(() => {
		onSlideChange()
	}, [])

	useEffect(() => {
		if (!selectedPlace) return
		const slideIdx = slides.findIndex(
			el => el.props.children === selectedPlace.properties.title
		)

		sliderRef.current.swiper.slideTo(slideIdx)
	}, [selectedPlace])

	const slides = []

	spatialData.data?.map.features.map(el =>
		slides.push(
			<SwiperSlide key={el.properties.id}>{el.properties.title}</SwiperSlide>
		)
	)

	const onSlideChange = () => {
		const currentSwipe = setTimeout(() => {
			const currentEl = document.querySelector('.swiper-slide-active')

			const currentValue = currentEl?.innerHTML

			const currentSwipe = spatialData.data?.map.features.find(
				el => el.properties.title === currentValue
			)

			setCurrentSwipe(currentSwipe)
		}, 250)

		return () => {
			clearTimeout(currentSwipe)
		}
	}

	const onSlideClick = e => {
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
