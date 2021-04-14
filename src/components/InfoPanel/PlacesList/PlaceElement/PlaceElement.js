import React from 'react'
import Photo from './Photo'
import PlaceName from './PlaceName'
import Divider from '@material-ui/core/Divider'
import PlaceDescription from './PlaceDescription'
import Video from './Video'
import Link from './Link'
import Audio from './Audio'

import styled from 'styled-components'

const PlaceElement = ({ spatialData, imageOpenHandler, fontColor }) => {
	const {
		photo1,
		photo2,
		photo3,
		title,
		audio,
		description,
		video,
		link,
	} = spatialData.properties
	return (
		<StyledWrapper>
			{photo1 && <Photo photo={photo1} open={imageOpenHandler} />}
			{photo2 && <Photo photo={photo2} open={imageOpenHandler} />}
			{photo3 && <Photo photo={photo3} open={imageOpenHandler} />}
			{title && <PlaceName title={title} fontColor={fontColor} />}
			{description && <Divider variant='middle' />}
			{description && (
				<PlaceDescription description={description} fontColor={fontColor} />
			)}
			{video && <Divider variant='middle' />}
			{video && <Video video={video} />}
			{link && <Divider variant='middle' />}
			{link && <Link link={link} fontColor={fontColor} />}
			{audio && <Divider variant='middle' />}
			{audio && <Audio audio={audio} />}
		</StyledWrapper>
	)
}

export default PlaceElement

const StyledWrapper = styled.div`
	margin-bottom: 100px;
`
