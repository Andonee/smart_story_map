import React from 'react'
import styled from 'styled-components/macro'

const Photo = ({ photo, open }) => {
	return (
		<StyledWrapper>
			<StyledImg src={photo} onClick={open} />
		</StyledWrapper>
	)
}

export default Photo

const StyledWrapper = styled.div`
	position: relative;
`
const StyledImg = styled.img`
	width: 100%;
	margin-bottom: 10px;

	&:hover {
		cursor: pointer;
		background: transparentize;
	}
`
