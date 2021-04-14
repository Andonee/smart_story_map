import React from 'react'
import styled from 'styled-components'

const PlaceName = ({ title, fontColor }) => {
	return <StyledWrapper color={fontColor}>{title}</StyledWrapper>
}

export default PlaceName

const StyledWrapper = styled.div`
	&& {
		color: ${props => props.color};
		font-size: 26px;
		padding: 20px;
		font-weight: bold;
	}
`
