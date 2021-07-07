import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Place from './Place'
import { timelineReducerActions } from '../../../store/timelineReducer'
import dispatchMatcher from '../../../utils/dispatchMatcher'

const PlaceOrder = ({ spatialData, dispatchAppData, onPlaceEdit, icon }) => {
	const [places, setPlaces] = useState(spatialData.features)
	const [isReordered, setIsReordered] = useState(false)

	useEffect(() => {
		if (isReordered) {
			dispatchMatcher(
				dispatchAppData,
				timelineReducerActions.SET_PLACES_ORDER,
				places
			)
			setIsReordered(false)
		}
	}, [isReordered, dispatchAppData, places])

	useEffect(() => {
		setPlaces(spatialData.features)
	}, [spatialData.features])

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

	const container = document.getElementById('placeorder-container')

	if (container) {
		console.log('Container', container.clientHeight)

		if (container.clientHeight > 200) {
			container.style.overflow = 'scroll'
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<StyledWrapper id='placeorder-container'>
				<Droppable droppableId='placelistId'>
					{(provided, snapshot) => (
						<StyledList
							ref={provided.innerRef}
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}>
							{places.map((place, idx) => {
								return (
									<Place
										placeName={place}
										key={place.properties.id}
										index={idx}
										onPlaceEdit={onPlaceEdit}
										icon={icon}
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
	${'' /* border: 1px solid #cccccc; */}
	padding: 5px;
	height: auto;
	max-height: 200px;
	${'' /* overflow: scroll; */}
	overflow-x: hidden;
`
const StyledList = styled.div`
	background: ${props => (props.isDraggingOver ? '#2D8DE8' : '#fff')};
	transition: background 0.2s ease;
	display: flex;
	flex-direction: column;
`
