import React from 'react'
import styled from 'styled-components/macro'

const Address = ({ address, fontColor }) => {
	return <StyledWrapper color={fontColor}>{address}</StyledWrapper>
}

export default Address

const StyledWrapper = styled.div`
	&& {
		color: ${props => props.color};
		font-size: 14px;
		padding: 0 50px;
		font-weight: bold;
		filter: opacity(0.5);
		margin-bottom: 5px;
	}
`
