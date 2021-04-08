import React from 'react'
import styled from 'styled-components'

const Video = ({ video }) => {
	return (
		<Wrapper>
			<iframe
				title={video}
				width='100%'
				height='200'
				src={video}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
			></iframe>
		</Wrapper>
	)
}

export default Video

const Wrapper = styled.div`
	padding: 20px 20px;
`
