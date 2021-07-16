import React from 'react'
import styled from 'styled-components/macro'

const Video = ({ video }) => {
	return (
		<StyledWrapper data-test='component-video'>
			<iframe
				title={video}
				width='100%'
				height='200'
				src={video}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
				data-test='video-iframe'></iframe>
		</StyledWrapper>
	)
}

export default Video

const StyledWrapper = styled.div`
	padding: 20px 20px;
`
