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
import translate from '../../utils/translate'
import { useHistory } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import Button from '@material-ui/core/Button'

const EditorPanel = ({
	setNewObject,
	newObject,
	onPostHandler,
	onPlaceEdit,
	dispatchAppData,
	appData,
	mapInstance,
	setIsRemoveIconModalOpen,
}) => {
	const [title, setTitle] = useState({
		title: appData.spatialData.data.info.title,
		isEdited: false,
	})
	const [description, setDescription] = useState({
		description: appData.spatialData.data.info.description,
		isEdited: false,
	})

	const history = useHistory()

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
			{/* <StyledReturnButton>
				<CustomButton
					text={<ArrowBackIcon />}
					size='small'
					variant='contained'
					onClick={onReturnHandler}
				/>
			</StyledReturnButton> */}
			<StyledTitleWrapper>
				<ErrorBoundary>
					<Title title={title} onTitleChange={onTitleChange} />
					<StyledEditBtnWrapper>
						<StyledEditButton
							text={
								<StyledEditButtonWrapper>
									<StyledEditIcon />
									{translate('ui.button.edit', 'Edit')}
								</StyledEditButtonWrapper>
							}
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
						<StyledEditButton
							text={
								<StyledEditButtonWrapper>
									<StyledEditIcon />
									{translate('ui.button.edit', 'Edit')}
								</StyledEditButtonWrapper>
							}
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
					setIsRemoveIconModalOpen={setIsRemoveIconModalOpen}
				/>
			</ErrorBoundary>
			<StyledDivider />
			<ErrorBoundary>
				<PlaceOrder
					spatialData={appData.spatialData.data.map}
					onPlaceEdit={onPlaceEdit}
					dispatchAppData={dispatchAppData}
					icon={appData.spatialData.data.style.selectedIcon.icon}
				/>
			</ErrorBoundary>
			{/* <StyledDivider /> */}
			<StyledAddPlaceButtonWrapper>
				<ErrorBoundary>
					<StyledAddPlaceButton
						size='small'
						variant='contained'
						onClick={onAddNewPlace}>
						<StyledEditButtonWrapper>
							<StyledAddPlaceIcon style={{ color: '#2D8DE8' }} />
							<strong>{translate('ui.button.addPlace', 'Add Place')}</strong>
						</StyledEditButtonWrapper>
					</StyledAddPlaceButton>
				</ErrorBoundary>
			</StyledAddPlaceButtonWrapper>

			{/* <StyledDivider /> */}
			<StyledSaveButtonWrapper>
				<ErrorBoundary>
					<CustomButton
						text={translate('ui.button.save', 'Save')}
						size='small'
						variant='contained'
						onClick={onPostHandler}
						width='100%'
					/>
				</ErrorBoundary>
			</StyledSaveButtonWrapper>
		</Editor>
	)
}

export default EditorPanel

const Editor = styled.div`
	&& {
		position: relative;
		height: 100%;
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
		justify-content: center;
		margin-top: 25px;
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

const StyledEditButtonWrapper = styled.span`
	display: flex;
	align-items: center;
`

const StyledEditIcon = styled(EditIcon)`
	transform: scale(0.6);
`
const StyledAddPlaceIcon = styled(AddLocationIcon)`
	transform: scale(0.8);
`
const StyledEditButton = styled(CustomButton)``

const StyledAddPlaceButton = styled(Button)`
	&& {
		width: auto;
		background: #fff;
		color: '#878787';
		transition: all 0.3s;
		margin-right: auto;

		&:hover {
			cursor: pointer;
			background: #2d8de8;
			color: #fff;

			& > span > span > svg > path {
				color: #fff;
			}
		}
	}
`
const StyledAddPlaceButtonWrapper = styled.div`
	width: 90%;
	margin-top: 20px;
`
const StyledSaveButtonWrapper = styled.div`
	position: absolute;
	bottom: 50px;
	width: 90px;
`
