import React from 'react'
import PlacesList from './PlacesList/PlacesList'
import Timeline from './Timeline/Timeline'
import styled from 'styled-components/macro'
import ErrorBoundary from '../UI/ErrorBoundary'

const InfoPanel = ({ spatialData, imageOpenHandler, onScrollHandler }) => {
	let renderComponent

	if (spatialData.type === 'story map') {
		renderComponent = (
			<PlacesList
				spatialData={spatialData.data.map}
				imageOpenHandler={imageOpenHandler}
				selectedIcon={spatialData.data.style.selectedIcon.icon}
				panelStyles={spatialData.data.style}
			/>
		)
	} else if (spatialData.type === 'timeline') {
		renderComponent = (
			<Timeline
				spatialData={spatialData.data.map}
				panelStyles={spatialData.data.style}
				imageOpenHandler={imageOpenHandler}
			/>
		)
	}

	return (
		<StyledWrapper onScroll={onScrollHandler} id='info-panel'>
			<ErrorBoundary>{renderComponent}</ErrorBoundary>
		</StyledWrapper>
	)
}

export default InfoPanel

const StyledWrapper = styled.div`
	&& {
		height: 100%;
		overflow: scroll;
	}
`
