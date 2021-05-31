import React from 'react'
import PlaceElement from './PlaceElement/PlaceElement'
import ErrorBoundary from '../../UI/ErrorBoundary'

const PlacesList = ({ spatialData, imageOpenHandler, fontColor }) => {
	return (
		<div>
			{spatialData.features.map(place => (
				<ErrorBoundary>
					<PlaceElement
						spatialData={place}
						key={place.properties.id}
						imageOpenHandler={imageOpenHandler}
						fontColor={fontColor}
					/>
				</ErrorBoundary>
			))}
		</div>
	)
}

export default PlacesList
