import React from 'react'
import PlacesList from './PlacesList/PlacesList'
import Timeline from './Timeline/Timeline'
import styled from 'styled-components'

const Sidebar = ({
	spatialData,
	imageOpenHandler,
	fontColor,
	timelineColor,
}) => {
	let renderComponent

	if (spatialData.type === 'story map') {
		renderComponent = (
			<PlacesList
				spatialData={spatialData.data.map}
				imageOpenHandler={imageOpenHandler}
				fontColor={fontColor}
			/>
		)
	} else if (spatialData.type === 'timeline') {
		renderComponent = (
			<Timeline
				spatialData={spatialData.data.map}
				imageOpenHandler={imageOpenHandler}
				timelineColor={timelineColor}
				fontColor={fontColor}
			/>
		)
	}

	return <StyledWrapper>{renderComponent}</StyledWrapper>
}

export default Sidebar

const StyledWrapper = styled.div`
	&& {
		height: 100%;
		overflow: scroll;
		/* background: black; */
	}
`
