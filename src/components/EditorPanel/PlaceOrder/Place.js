import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Place = ({ placeName, index }) => {
	return (
		<Draggable draggableId={placeName.properties.id} index={index}>
			{(provided, snapshot) => (
				<StyledPlace
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
				>
					{placeName.properties.title}
				</StyledPlace>
			)}
		</Draggable>
	)
}

export default Place

const StyledPlace = styled.div`
	&& {
		padding: 8px;
		text-align: center;
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
