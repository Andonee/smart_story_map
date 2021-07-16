import React from 'react'
import styled from 'styled-components/macro'

const Title = () => {
	return <StyledTitle data-test='component-title'>Story Map</StyledTitle>
}

export default Title

const StyledTitle = styled.div`
	font-family: 'Rancho', cursive;
	font-size: 54px;
	margin-top: 20px;
	letter-spacing: 5px;
`
