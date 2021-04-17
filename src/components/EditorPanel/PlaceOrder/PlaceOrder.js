import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Place from './Place'

const PlaceOrder = ({ spatialData, onPlacesOrderChange }) => {
	console.log(spatialData)
	const [places, setPlaces] = useState(spatialData.features)
	const [isReordered, setIsReordered] = useState(false)

	useEffect(() => {
		if (isReordered) {
			onPlacesOrderChange(places)
			setIsReordered(false)
		}
	}, [isReordered, onPlacesOrderChange, places])

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	const onDragEnd = result => {
		const { destination, source } = result

		if (!destination) return
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return

		const newPlacesList = places

		const quotes = reorder(
			newPlacesList,
			result.source.index,
			result.destination.index
		)

		setPlaces(quotes)
		setIsReordered(true)
	}
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<StyledWrapper>
				<Droppable droppableId='placelistId'>
					{(provided, snapshot) => (
						<StyledList
							ref={provided.innerRef}
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
						>
							{places.map((place, idx) => {
								return (
									<Place
										placeName={place}
										key={place.properties.id}
										index={idx}
									/>
								)
							})}
							{provided.placeholder}
						</StyledList>
					)}
				</Droppable>
			</StyledWrapper>
		</DragDropContext>
	)
}

export default PlaceOrder

const StyledWrapper = styled.div`
	width: 90%;
	background: #fff;
	border: 1px solid #cccccc;
	padding: 5px;
	height: auto;
	max-height: 400px;
`
const StyledList = styled.div`
	background: ${props => (props.isDraggingOver ? '#a8fff0' : 'wheat')};
	transition: background 0.2s ease;
	display: flex;
	flex-direction: column;
`
