import React from 'react'
import styled from 'styled-components/macro'

const PlaceName = ({ title, fontColor }) => {
	return <StyledWrapper color={fontColor}>{title}</StyledWrapper>
}

export default PlaceName

const StyledWrapper = styled.div`
	&& {
		color: ${props => props.color};
		font-size: 20px;
		padding: 20px;
		font-weight: bold;
	}
`
