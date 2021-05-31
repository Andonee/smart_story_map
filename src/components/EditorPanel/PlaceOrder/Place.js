import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CustomTooltip from '../../UI/CustomTooltip'

const Place = ({ placeName, index, onPlaceEdit }) => {
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
					{placeName.properties.title}
					<StyledIconsWrapper>
						<CustomTooltip title='Edit'>
							<StyledEditBtn onClick={onPlaceEditHandler}>
								<EditIcon style={{ width: '15px' }} />
							</StyledEditBtn>
						</CustomTooltip>
						<CustomTooltip title='Remove'>
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
		padding: 8px;
		text-align: center;
		font-size: 12px;
		border: 1px solid gray;
		margin: 2px 0;
		background: ${props => (props.isDragging ? '#3f97ea' : '#2D8DE8')};
		transition: background 0.2s ease;
		color: #fff;

		&:hover {
			cursor: pointer;
			background: #3f97ea;
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
			background: #2d8de8;
			transform: scale(1.2);
		}
	}
`
const StyledIconsWrapper = styled.div`
	display: flex;
`
