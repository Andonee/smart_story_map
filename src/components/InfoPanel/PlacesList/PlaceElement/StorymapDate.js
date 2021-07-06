import React from 'react'
import styled from 'styled-components'

const StorymapDate = ({ date, fontColor }) => {
	return <StyledDate color={fontColor}>{date}</StyledDate>
}

export default StorymapDate

const StyledDate = styled.div`
	&& {
		color: ${props => props.color};

		padding: 0 5px;
		margin: 5px 0;
		font-weight: bold;
		filter: opacity(0.7);
		font-size: 14px;
	}
`
