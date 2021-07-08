import React from 'react'
import styled from 'styled-components/macro'

const Audio = ({ audio }) => {
	return (
		<StyledPlayer controls>
			<source src={audio} type='audio/mpeg' />
		</StyledPlayer>
	)
}

export default Audio

const StyledPlayer = styled.audio`
	padding: 20px 20px;

	&:focus {
		outline: none;
	}
`
