import React from 'react'
import styled from 'styled-components'

const Audio = ({ audio }) => {
	return (
		<Player controls>
			<source src={audio} type='audio/mpeg' />
		</Player>
	)
}

export default Audio

const Player = styled.audio`
	padding: 20px 20px;
`
