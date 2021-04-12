import React from 'react'
import PlacesList from './PlacesList/PlacesList'
import Timeline from './Timeline/Timeline'
import styled from 'styled-components'

const Sidebar = ({ spatialData, imageOpenHandler }) => {
	let renderComponent
	if (spatialData.type === 'story map') {
		renderComponent = (
			<PlacesList
				spatialData={spatialData.data.map}
				imageOpenHandler={imageOpenHandler}
			/>
		)
	} else if (spatialData.type === 'timeline') {
		renderComponent = <Timeline spatialData={spatialData} />
	}

	return <StyledWrapper>{renderComponent}</StyledWrapper>
}

export default Sidebar

const StyledWrapper = styled.div`
	&& {
		height: 100%;
		overflow: scroll;
		background: #fff;
	}
`
