import React from 'react'
import Photo from './Photo'
import PlaceName from './PlaceName'
import Divider from '@material-ui/core/Divider'
import PlaceDescription from './PlaceDescription'
import Video from './Video'
import Link from './Link'
import Audio from './Audio'
import Address from './Address'
import StorymapDate from './StorymapDate'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styled from 'styled-components/macro'

const PlaceElement = ({
	spatialData,
	imageOpenHandler,
	fontColor,
	selectedIcon,
}) => {
	const {
		photo1,
		photo2,
		photo3,
		title,
		audio,
		description,
		video,
		link,
		id,
		date,
		address,
	} = spatialData.properties

	return (
		<StyledWrapper id={id}>
			<StyledAccordion>
				<StyledAccordionSummary
					expandIcon={<StyledExpandIcon color={`${fontColor}`} />}
					aria-controls='panel1a-content'
					id='panel1a-header'>
					<StyledTitleContainer>
						<StyledIcon
							src={`data:image/svg+xml;base64,${selectedIcon}`}
							alt='place icon'
						/>
						{title && <PlaceName title={title} fontColor={`${fontColor}`} />}
					</StyledTitleContainer>

					{address && <Address address={address} fontColor={fontColor} />}
					{date && <Divider variant='fullWidth' />}
					{date && <StorymapDate date={date} fontColor={fontColor} />}
				</StyledAccordionSummary>
				<StyledAccordionDetails>
					{description && (
						<PlaceDescription description={description} fontColor={fontColor} />
					)}
					{photo1 && <Photo photo={photo1} open={imageOpenHandler} />}
					{photo2 && <Photo photo={photo2} open={imageOpenHandler} />}
					{photo3 && <Photo photo={photo3} open={imageOpenHandler} />}
					{video && <Divider variant='middle' />}
					{video && <Video video={video} />}
					{link && <Divider variant='middle' />}
					{link && <Link link={link} fontColor={fontColor} />}
					{audio && <Divider variant='middle' />}
					{audio && <Audio audio={audio} />}
				</StyledAccordionDetails>
			</StyledAccordion>
		</StyledWrapper>
	)
}

export default PlaceElement

const StyledWrapper = styled.div`
	margin-bottom: 20px;

	& + & {
		opacity: 0.5;
	}

	&:first-of-type {
		margin-top: 15px;
	}

	&:last-of-type {
		margin-bottom: 90vh;
	}

	& > div {
		margin: 0 auto !important;
	}
`

const StyledAccordion = styled(Accordion)`
	&& {
		margin: 0 auto;
		width: 95%;
		border-radius: 5px !important;
		box-shadow: 2px 2px 5px 0px rgba(107, 107, 107, 1);
	}
`

const StyledAccordionSummary = styled(AccordionSummary)`
	&& {
		& > div {
			display: flex;
			flex-direction: column;
		}
	}
`
const StyledIcon = styled.img`
	width: 30px;
`
const StyledTitleContainer = styled.div`
	display: flex;
`
const StyledExpandIcon = styled(ExpandMoreIcon)`
	&& {
		color: ${props => props.color};
		border: 2px solid ${props => props.color};
		border-radius: 50%;
	}
`
const StyledAccordionDetails = styled(AccordionDetails)`
	&& {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 0;
	}
`
