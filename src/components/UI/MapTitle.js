import React from 'react'
import styled from 'styled-components'

const MapTitle = ({ title }) => {
	return <StyledTitle>{title}</StyledTitle>
}

export default MapTitle

const StyledTitle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
	max-width: 50%;
	min-height: 50px;
	height: auto;
	background: #ffffffb0;
	position: absolute;
	left: 5px;
	top: 20px;
	z-index: 2;
	padding: 2px 20px;
	letter-spacing: 1px;
	line-height: 28px;
	color: #545454;
	font-weight: bold;
	font-size: 20px;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
	border-radius: 10px;
`
