import React, { useState } from 'react'
import Title from './Title'
import Description from './Description'
import MapConfig from './MapConfig'
import styled from 'styled-components'
import PlaceOrder from './PlaceOrder/PlaceOrder'
import produce from 'immer'
import CustomButton from '../UI/CustomButton'
import { timelineReducerActions } from '../../store/timelineReducer'
import dispatchMatcher from '../../utils/dispatchMatcher'
import ErrorBoundary from '../UI/ErrorBoundary'

const EditorPanel = ({
	setNewObject,
	newObject,
	onPostHandler,
	onPlaceEdit,
	dispatchAppData,
	appData,
	mapInstance,
}) => {
	const [title, setTitle] = useState({
		title: appData.spatialData.data.info.title,
		isEdited: false,
	})
	const [description, setDescription] = useState({
		description: appData.spatialData.data.info.description,
		isEdited: false,
	})

	const onTitleChange = e => {
		dispatchMatcher(
			dispatchAppData,
			timelineReducerActions.SET_TITLE,
			e.target.value
		)

		setTitle(prevState => ({
			...prevState,
			title: e.target.value,
		}))
	}

	const onDescriptionChange = e => {
		dispatchMatcher(
			dispatchAppData,
			timelineReducerActions.SET_DESCRIPTION,
			e.target.value
		)

		setDescription(prevState => ({
			...prevState,
			description: e.target.value,
		}))
	}

	const onTitleEditHandle = e => {
		setTitle(prevState => ({
			...prevState,
			isEdited: !title.isEdited,
		}))
	}

	const onDescriptionEditHandle = e => {
		setDescription(prevState => ({
			...prevState,
			isEdited: !description.isEdited,
		}))
	}

	const onAddNewPlace = () => {
		setNewObject(
			produce(newObject, draft => {
				draft.addNewObject = true
			})
		)
	}

	return (
		<Editor>
			<StyledTitleWrapper>
				<ErrorBoundary>
					<Title title={title} onTitleChange={onTitleChange} />
					<StyledEditBtnWrapper>
						<CustomButton
							text='Edit'
							size='small'
							variant='contained'
							onClick={onTitleEditHandle}
						/>
					</StyledEditBtnWrapper>
				</ErrorBoundary>
			</StyledTitleWrapper>
			<StyledDivider />
			<StyledTitleWrapper>
				<ErrorBoundary>
					<Description
						description={description}
						onDescriptionChange={onDescriptionChange}
					/>
					<StyledEditBtnWrapper>
						<CustomButton
							text='Edit'
							size='small'
							variant='contained'
							onClick={onDescriptionEditHandle}
						/>
					</StyledEditBtnWrapper>
				</ErrorBoundary>
			</StyledTitleWrapper>
			<StyledDivider />
			<ErrorBoundary>
				<MapConfig
					dispatchAppData={dispatchAppData}
					appData={appData}
					mapInstance={mapInstance}
				/>
			</ErrorBoundary>
			<StyledDivider />
			<ErrorBoundary>
				<PlaceOrder
					spatialData={appData.spatialData.data.map}
					onPlaceEdit={onPlaceEdit}
					dispatchAppData={dispatchAppData}
				/>
			</ErrorBoundary>
			<StyledDivider />
			<ErrorBoundary>
				<CustomButton
					text='Add place'
					size='small'
					variant='contained'
					onClick={onAddNewPlace}
					width='90%'
				/>
			</ErrorBoundary>
			<StyledDivider />
			<ErrorBoundary>
				<CustomButton
					text='SAVE'
					size='small'
					variant='contained'
					onClick={onPostHandler}
					width='90%'
				/>
			</ErrorBoundary>
		</Editor>
	)
}

export default EditorPanel

const Editor = styled.div`
	&& {
		height: auto;
		background: #fff;
		padding-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`
const StyledTitleWrapper = styled.div`
	&& {
		width: 90%;
	}
`

const StyledEditBtnWrapper = styled.div`
	&& {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
`

const StyledDivider = styled.div`
	&& {
		width: 90%;
		height: 1px;
		background: #cccccc;
		margin: 20px 0;
	}
`
