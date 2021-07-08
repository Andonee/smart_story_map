import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CustomTooltip from '../../UI/CustomTooltip'
import translate from '../../../utils/translate'

const Place = ({ placeName, index, onPlaceEdit, icon }) => {
	const onPlaceEditHandler = () => {
		onPlaceEdit(placeName.properties, 'edit')
	}

	const onPlaceRemoveHandler = () => {
		onPlaceEdit(placeName.properties, 'remove')
	}

	return (
		<Draggable draggableId={placeName.properties.id} index={index}>
			{(provided, snapshot) => (
				<StyledPlace
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}>
					<StyledIcon src={`data:image/svg+xml;base64,${icon}`} />
					<StyledPlaceName>{placeName.properties.title}</StyledPlaceName>
					<StyledIconsWrapper>
						<CustomTooltip title={translate('ui.button.edit', 'Edit')}>
							<StyledEditBtn onClick={onPlaceEditHandler}>
								<EditIcon style={{ width: '15px' }} />
							</StyledEditBtn>
						</CustomTooltip>
						<CustomTooltip title={translate('ui.button.remove', 'Remove')}>
							<StyledEditBtn onClick={onPlaceRemoveHandler}>
								<DeleteIcon style={{ width: '15px' }} />
							</StyledEditBtn>
						</CustomTooltip>
					</StyledIconsWrapper>
				</StyledPlace>
			)}
		</Draggable>
	)
}

export default Place

const StyledPlace = styled.div`
	&& {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: 'Lato', sans-serif;
		padding: 8px;
		text-align: center;
		font-size: 14px;
		border: 1px solid gray;
		border-radius: 5px;
		margin: 2px 0;
		background: ${props => (props.isDragging ? '#9c9c9c' : '#ececec')};
		transition: background 0.2s ease;
		color: #636363;
		font-weight: bold;

		&:hover {
			cursor: pointer;
			background: #9c9c9c;
		}
	}
`
const StyledEditBtn = styled.div`
	&& {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		transition: all 0.3s ease-in-out;

		&:hover {
			background: #ececec;
			transform: scale(1.2);
		}
	}
`
const StyledIconsWrapper = styled.div`
	display: flex;
`
const StyledPlaceName = styled.div`
	width: 85%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`
const StyledIcon = styled.img`
	max-height: 30px;
`
