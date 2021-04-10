import React from 'react'
import styled from 'styled-components'

const PlaceDescription = ({ description }) => {
	return <StyledWrapper>{description}</StyledWrapper>
}

export default PlaceDescription

const StyledWrapper = styled.div`
	${({ theme }) => `
		padding: 20px 20px;
		text-align: justify;
		color: ${theme.palette.primary.main};
	`}
`
