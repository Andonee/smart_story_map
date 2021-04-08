import React from 'react'
import styled from 'styled-components'

const PlaceName = ({ title }) => {
	return <Wrapper>{title}</Wrapper>
}

export default PlaceName

const Wrapper = styled.div`
	${({ theme }) => `
		color: ${theme.palette.primary.main};
		font-size: 26px;
		padding: 20px;
		font-weight: bold;
	`}
`
