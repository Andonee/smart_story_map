import React, { useState } from 'react'
import Title from './Title'
import Description from './Description'
import MapConfig from './MapConfig'
import styled from 'styled-components'
import PlaceOrder from './PlaceOrder/PlaceOrder'
import produce from 'immer'
import CostumButton from '../UI/CostumButton'

const EditorPanel = ({
	data,
	onIconChange,
	onIconSizeChange,
	IconSize,
	onBasemapChange,
	onPanelsOrderChange,
	backgroundColor,
	setBackgroundColor,
	fontColor,
	setFontColor,
	onPlacesOrderChange,
	setNewObject,
	newObject,
	onPostHandler,
	onPlaceEdit,
}) => {
	const [title, setTitle] = useState({
		title: data.info.title,
		isEdited: false,
	})
	const [description, setDescription] = useState({
		description: data.info.description,
		isEdited: false,
	})

	const onTitleChange = e => {
		setTitle(prevState => ({
			...prevState,
			title: e.target.value,
		}))
	}

	const onDescriptionChange = e => {
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
				<Title title={title} onTitleChange={onTitleChange} />
				<StyledEditBtnWrapper>
					<CostumButton
						text='Edit'
						size='small'
						variant='contained'
						onClick={onTitleEditHandle}
					/>
				</StyledEditBtnWrapper>
			</StyledTitleWrapper>
			<StyledDivider />
			<StyledTitleWrapper>
				<Description
					description={description}
					onDescriptionChange={onDescriptionChange}
				/>
				<StyledEditBtnWrapper>
					<CostumButton
						text='Edit'
						size='small'
						variant='contained'
						onClick={onDescriptionEditHandle}
					/>
				</StyledEditBtnWrapper>
			</StyledTitleWrapper>
			<StyledDivider />
			<MapConfig
				onIconChange={onIconChange}
				onIconSizeChange={onIconSizeChange}
				IconSize={IconSize}
				onBasemapChange={onBasemapChange}
				onPanelsOrderChange={onPanelsOrderChange}
				backgroundColor={backgroundColor}
				setBackgroundColor={setBackgroundColor}
				fontColor={fontColor}
				setFontColor={setFontColor}
			/>
			<StyledDivider />
			<PlaceOrder
				spatialData={data.map}
				onPlacesOrderChange={onPlacesOrderChange}
				onPlaceEdit={onPlaceEdit}
			/>
			<StyledDivider />

			<CostumButton
				text='Add place'
				size='small'
				variant='contained'
				onClick={onAddNewPlace}
				width='90%'
			/>

			<StyledDivider />

			<CostumButton
				text='SAVE'
				size='small'
				variant='contained'
				onClick={onPostHandler}
				width='90%'
			/>
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
