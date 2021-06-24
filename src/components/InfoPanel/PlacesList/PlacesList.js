import React from 'react'
import PlaceElement from './PlaceElement/PlaceElement'
import ErrorBoundary from '../../UI/ErrorBoundary'
import styled from 'styled-components'

const PlacesList = ({ spatialData, imageOpenHandler, fontColor }) => {
	return (
		<div>
			{spatialData.features.map(place => (
				<ErrorBoundary key={place.properties.id}>
					<PlaceElement
						spatialData={place}
						key={place.properties.id}
						imageOpenHandler={imageOpenHandler}
						fontColor={fontColor}
					/>
				</ErrorBoundary>
			))}
			{spatialData.features.length === 0 && (
				<StyledPlaceholder>Dodaj miejsca do swojej mapy</StyledPlaceholder>
			)}
		</div>
	)
}

export default PlacesList

const StyledPlaceholder = styled.div`
	&& {
		${({ theme }) => `{
		color: ${theme.palette.info.main};
		font-size: 20px;
		margin-top: auto;
    text-align: center;
    margin-top: 20px;
	}`}
	}
`
