import styled, { css } from 'styled-components'
import PlaceName from '../InfoPanel/PlacesList/PlaceElement/PlaceName'
import PlaceDescription from '../InfoPanel/PlacesList/PlaceElement/PlaceDescription'
import Video from '../InfoPanel/PlacesList/PlaceElement/Video'
import Link from '../InfoPanel/PlacesList/PlaceElement/Link'
import Audio from '../InfoPanel/PlacesList/PlaceElement/Audio'
import Photo from '../InfoPanel/PlacesList/PlaceElement/Photo'
import Divider from '@material-ui/core/Divider'

import CloseIcon from '@material-ui/icons/Close'

const SwiperInfo = ({ info, open, setOpen, fontColor, imageOpenHandler }) => {
	const onMobileInfoCloseHandler = () => {
		setOpen(false)
	}
	return (
		<StyledWrapper open={open} key={info?.properties.id}>
			<StyledCloseButton onClick={onMobileInfoCloseHandler}>
				<CloseIcon />
			</StyledCloseButton>
			<StyledInfo>
				{info?.properties.photo1 && (
					<Photo photo={info?.properties.photo1} open={imageOpenHandler} />
				)}
				{info?.properties.photo2 && (
					<Photo photo={info?.properties.photo2} open={imageOpenHandler} />
				)}
				{info?.properties.photo3 && (
					<Photo photo={info?.properties.photo3} open={imageOpenHandler} />
				)}
				{info?.properties.title && (
					<PlaceName title={info?.properties.title} fontColor={fontColor} />
				)}
				{info?.properties.description && <Divider variant='middle' />}
				{info?.properties.description && (
					<PlaceDescription
						description={info?.properties.description}
						fontColor={fontColor}
					/>
				)}
				{info?.properties.video && <Divider variant='middle' />}
				{info?.properties.video && <Video video={info?.properties.video} />}
				{info?.properties.link && <Divider variant='middle' />}
				{info?.properties.link && (
					<Link link={info?.properties.link} fontColor={fontColor} />
				)}
				{info?.properties.audio && <Divider variant='middle' />}
				{info?.properties.audio && (
					<StyledAudio>
						{' '}
						<Audio audio={info?.properties.audio} />
					</StyledAudio>
				)}
			</StyledInfo>
		</StyledWrapper>
	)
}

export default SwiperInfo

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: #fff;
	transform: translateY(100%);
	overflow: scroll;
	${props =>
		props.open &&
		css`
			transform: translateY(0);
		`}
	transition: all .3s;
	z-index: 5;
`
const StyledInfo = styled.div`
	margin-top: 10px;
`

const StyledAudio = styled.div`
	display: flex;
	justify-content: center;
`
const StyledCloseButton = styled.button`
	background: none;
	border: none;
	margin-left: auto;
	margin-right: 5px;
	margin-top: 10px;
`
