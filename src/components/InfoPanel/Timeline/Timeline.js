import React from 'react'
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import Photo from '../PlacesList/PlaceElement/Photo'
import PlaceName from '../PlacesList/PlaceElement/PlaceName'
import Divider from '@material-ui/core/Divider'
import PlaceDescription from '../PlacesList/PlaceElement/PlaceDescription'
import Video from '../PlacesList/PlaceElement/Video'
import Link from '../PlacesList/PlaceElement/Link'
import Audio from '../PlacesList/PlaceElement/Audio'
import Date from '../PlacesList/PlaceElement/Date'
import TimelineIcon from '@material-ui/icons/Timeline'
import styled from 'styled-components/macro'

const Timeline = ({ spatialData, imageOpenHandler, panelStyles }) => {
	const {
		fontColor,
		timelineColor,
		timeAxisColor,
		timelineIconBorderColor,
		timelineIconColor,
	} = panelStyles

	console.log('spatialData', spatialData)
	return (
		<StyledTimeline layout='1-column-left' color={timeAxisColor}>
			{spatialData.features.map(place => {
				const {
					photo1,
					photo2,
					photo3,
					title,
					audio,
					description,
					video,
					link,
					date,
				} = place.properties
				return (
					<StyledTimelineElement
						className='vertical-timeline-element--work'
						contentStyle={{ background: `${timelineColor}`, color: '#fff' }}
						contentArrowStyle={{ borderRight: `7px solid  ${timelineColor}` }}
						iconStyle={{
							background: `${timelineColor}`,
							color: `${timelineIconColor}`,
							boxShadow: `0px 0px 0px 4px ${timelineIconBorderColor}`,
						}}
						icon={<TimelineIcon />}
						key={place.properties.id}
						id={place.properties.id}>
						{photo1 && <Photo photo={photo1} open={imageOpenHandler} />}
						{photo2 && <Photo photo={photo2} open={imageOpenHandler} />}
						{photo3 && <Photo photo={photo3} open={imageOpenHandler} />}
						{title && <PlaceName title={title} fontColor={`${fontColor}`} />}
						{description && <Divider variant='middle' />}
						{description && (
							<PlaceDescription
								description={description}
								fontColor={`${fontColor}`}
							/>
						)}
						{video && <Divider variant='middle' />}
						{video && <Video video={video} />}
						{link && <Divider variant='middle' />}
						{link && <Link link={link} fontColor={`${fontColor}`} />}
						{audio && <Divider variant='middle' />}
						{audio && <Audio audio={audio} />}
						{date && <Date date={date} fontColor={`${fontColor}`} />}
					</StyledTimelineElement>
				)
			})}
		</StyledTimeline>
	)
}

export default Timeline

const StyledTimeline = styled(VerticalTimeline)`
	width: 80%;
	margin-left: auto;
	margin-right: 10px;
	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 18px;
		height: 100%;
		width: 4px;
		background: ${props => props.color};
	}
`

const StyledTimelineElement = styled(VerticalTimelineElement)``
