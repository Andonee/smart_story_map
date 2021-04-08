import React from 'react'
import Photo from './Photo'
import PlaceName from './PlaceName'
import Divider from '@material-ui/core/Divider'
import PlaceDescription from './PlaceDescription'
import Video from './Video'
import Link from './Link'
import Audio from './Audio'

import styled from 'styled-components'

const PlaceElement = ({ spatialData, imageOpenHandler }) => {
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
		<Wrapper>
			{photo1 && <Photo photo={photo1} open={imageOpenHandler} />}
			{photo2 && <Photo photo={photo2} open={imageOpenHandler} />}
			{photo3 && <Photo photo={photo3} open={imageOpenHandler} />}
			{title && <PlaceName title={title} />}
			{description && <Divider variant='middle' />}
			{description && <PlaceDescription description={description} />}
			{video && <Divider variant='middle' />}
			{video && <Video video={video} />}
			{link && <Divider variant='middle' />}
			{link && <Link link={link} />}
			{audio && <Divider variant='middle' />}
			{audio && <Audio audio={audio} />}
		</Wrapper>
	)
}

export default PlaceElement

const Wrapper = styled.div`
	margin-bottom: 100px;
`
