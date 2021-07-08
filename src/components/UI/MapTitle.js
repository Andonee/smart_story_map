import React from 'react'
import styled from 'styled-components/macro'
import { isMobile } from 'react-device-detect'

const MapTitle = ({ title }) => {
	return <StyledTitle>{title}</StyledTitle>
}

export default MapTitle

const StyledTitle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
	max-width: ${isMobile ? '90%' : '50%'};
	min-height: 50px;
	height: auto;
	background: #ffffffb0;
	position: absolute;
	left: ${isMobile ? '0' : '5px'};
	top: ${isMobile ? '0' : '20px'};
	z-index: 2;
	padding: 2px 20px;
	letter-spacing: 1px;
	line-height: 28px;
	color: #545454;
	font-weight: bold;
	font-size: ${isMobile ? '16px' : '20px'};
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
	border-radius: ${isMobile ? '0' : '10px'};
`
