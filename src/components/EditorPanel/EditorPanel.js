import React, { useState } from 'react'
import Title from './Title'
import Description from './Description'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const EditorPanel = ({ data }) => {
	console.log(data)
	const [title, setTitle] = useState({
		title: data.title,
		isEdited: false,
	})
	const [description, setDescription] = useState({
		description: data.description,
		isEdited: false,
	})

	const onTitleChange = (e) => {
		setTitle((prevState) => ({
			...prevState,
			title: e.target.value,
		}))
	}

	const onDescriptionChange = (e) => {
		setDescription((prevState) => ({
			...prevState,
			description: e.target.value,
		}))
	}

	const onTitleEditHandle = (e) => {
		setTitle((prevState) => ({
			...prevState,
			isEdited: !title.isEdited,
		}))
	}

	const onDescriptionEditHandle = (e) => {
		setDescription((prevState) => ({
			...prevState,
			isEdited: !description.isEdited,
		}))
	}

	return (
		<Editor>
			<div>
				<TitleWrapper>
					<Title title={title} onTitleChange={onTitleChange} />
					<EditBtnWrapper>
						<EditBtn
							variant='contained'
							color='primary'
							onClick={onTitleEditHandle}
						>
							Edit
						</EditBtn>
					</EditBtnWrapper>
				</TitleWrapper>
				<Divider />
				<TitleWrapper>
					<Description
						description={description}
						onDescriptionChange={onDescriptionChange}
					/>
					<EditBtnWrapper>
						<EditBtn
							variant='contained'
							color='primary'
							onClick={onDescriptionEditHandle}
						>
							Edit
						</EditBtn>
					</EditBtnWrapper>
				</TitleWrapper>
				<Divider />
			</div>
		</Editor>
	)
}

export default EditorPanel

const Editor = styled.div`
	${({ theme }) => `
	height: 100%;

	& > div {
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

`}
`
const TitleWrapper = styled.div`
	width: 90%;
`

const EditBtnWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
`

const EditBtn = styled(Button)`
	${({ theme }) => `
		margin-right: 20px;
		background: ${theme.palette.info.main};

		&:hover {
			background: ${theme.palette.info.light};
		},
		`}
`
const Divider = styled.div`
	width: 90%;
	height: 1px;
	background: #cccccc;
	margin: 20px 0;
`
