import React from 'react'
import styled from 'styled-components'
import translate from '../../utils/translate'

const AddPlaceInfo = () => {
	return (
		<StyledAddPlaceInfo>
			{translate(
				'ui.addPlace.newPlaceInfo',
				'Click on the map where you want to add a new place'
			)}
		</StyledAddPlaceInfo>
	)
}

export default AddPlaceInfo

const StyledAddPlaceInfo = styled.div`
	font-family: 'Lato', sans-serif;
	font-weight: bold;
	letter-spacing: 1px;
	z-index: 5;
	width: 30%;
	height: 40px;
	padding: 2px 6px;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 20px;
	margin-left: auto;
	margin-right: auto;
	background: #2d8de8b5;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
`
