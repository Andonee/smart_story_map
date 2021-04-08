import React from 'react'
import styled from 'styled-components'

const PlaceDescription = ({ description }) => {
	return <Wrapper>{description}</Wrapper>
}

export default PlaceDescription

const Wrapper = styled.div`
	${({ theme }) => `
		padding: 20px 20px;
		text-align: justify;
		color: ${theme.palette.primary.main};
	`}
`
