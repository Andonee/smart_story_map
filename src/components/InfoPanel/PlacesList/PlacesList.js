import React from 'react'
import PlaceElement from './PlaceElement/PlaceElement'

const PlacesList = ({ spatialData }) => {
	return (
		<div>
			{spatialData.gliwice.features.map(place => (
				<PlaceElement spatialData={place} key={place.properties.id} />
			))}
		</div>
	)
}

export default PlacesList
