import React from 'react'
import PlaceElement from './PlaceElement/PlaceElement'

const PlacesList = ({ spatialData, imageOpenHandler }) => {
	return (
		<div>
			{spatialData.gliwice.features.map((place) => (
				<PlaceElement
					spatialData={place}
					key={place.properties.id}
					imageOpenHandler={imageOpenHandler}
				/>
			))}
		</div>
	)
}

export default PlacesList
