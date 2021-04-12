import React, { useState } from 'react'
import Title from './Title'
import Description from './Description'
import MapConfig from './MapConfig'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const EditorPanel = ({
	data,
	onIconChange,
	onIconSizeChange,
	IconSize,
	onBasemapChange,
	onPanelsOrderChange,
}) => {
	console.log(data)
	const [title, setTitle] = useState({
		title: data.title,
		isEdited: false,
	})
	const [description, setDescription] = useState({
		description: data.description,
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

	return (
		<Editor>
			<StyledTitleWrapper>
				<Title title={title} onTitleChange={onTitleChange} />
				<StyledEditBtnWrapper>
					<StyledEditBtn
						variant='contained'
						color='primary'
						onClick={onTitleEditHandle}
					>
						Edit
					</StyledEditBtn>
				</StyledEditBtnWrapper>
			</StyledTitleWrapper>
			<StyledDivider />
			<StyledTitleWrapper>
				<Description
					description={description}
					onDescriptionChange={onDescriptionChange}
				/>
				<StyledEditBtnWrapper>
					<StyledEditBtn
						variant='contained'
						color='primary'
						onClick={onDescriptionEditHandle}
					>
						Edit
					</StyledEditBtn>
				</StyledEditBtnWrapper>
			</StyledTitleWrapper>
			<StyledDivider />
			<MapConfig
				onIconChange={onIconChange}
				onIconSizeChange={onIconSizeChange}
				IconSize={IconSize}
				onBasemapChange={onBasemapChange}
				onPanelsOrderChange={onPanelsOrderChange}
			/>
		</Editor>
	)
}

export default EditorPanel

const Editor = styled.div`
	&& {
		${({ theme }) => `
	height: 100%;
	background: #fff;
	padding-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;

`}
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

const StyledEditBtn = styled(Button)`
	&& {
		${({ theme }) => `
		margin-right: 20px;
		background: ${theme.palette.info.main};

		&:hover {
			background: ${theme.palette.info.light};
		}
		`}
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
