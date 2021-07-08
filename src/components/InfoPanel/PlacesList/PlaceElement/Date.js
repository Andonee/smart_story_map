import React from 'react'
import styled from 'styled-components/macro'

const Date = ({ date, fontColor }) => {
	return <StyledDate color={fontColor}>{date}</StyledDate>
}

export default Date

const StyledDate = styled.div`
	position: absolute;
	top: 10px;
	left: -38%;
	color: ${props => props.color};
	font-size: 16px;
	font-weight: bold;
`
