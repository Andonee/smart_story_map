import React from 'react'
import PlacesList from './PlacesList/PlacesList'
import Timeline from './Timeline/Timeline'
import styled from 'styled-components'
import ErrorBoundary from '../UI/ErrorBoundary'
import { CallMerge } from '@material-ui/icons'

const InfoPanel = ({
	spatialData,
	imageOpenHandler,
	fontColor,
	timelineColor,
	timeAxisColor,
	timelineIconBorderColor,
	timelineIconColor,
	onScrollHandler,
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
				panelStyles={spatialData.data.style}
				imageOpenHandler={imageOpenHandler}
				timelineColor={timelineColor}
				fontColor={fontColor}
				timeAxisColor={timeAxisColor}
				timelineIconBorderColor={timelineIconBorderColor}
				timelineIconColor={timelineIconColor}
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
		overflow: scroll; /* background: black; */
	}
`
