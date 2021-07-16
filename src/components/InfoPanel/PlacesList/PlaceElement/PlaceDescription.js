import React from 'react'
import styled from 'styled-components/macro'

const PlaceDescription = ({ description, fontColor }) => {
	return (
		<StyledWrapper color={fontColor} data-test='component-placeDescription'>
			{description}
		</StyledWrapper>
	)
}

export default PlaceDescription

const StyledWrapper = styled.div`
	padding: 20px 20px;
	text-align: justify;
	color: ${props => props.color};
`
