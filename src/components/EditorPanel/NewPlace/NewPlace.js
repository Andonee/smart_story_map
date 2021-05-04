import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import produce from 'immer'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'

const NewPlace = ({ onCreateNewObject }) => {
	const [inputs, setInputs] = useState({})
	const { register, handleSubmit } = useForm()

	const onSubmit = data => onCreateNewObject(data)

	return (
		<StyledContainer onSubmit={handleSubmit(onSubmit)}>
			<StyledInput
				id='title'
				{...register('title')}
				label='title'
				variant='outlined'
				size='small'
			/>
			<StyledDivider />
			<StyledInput
				id='description'
				{...register('description')}
				label='description'
				multiline
				rows={4}
				variant='outlined'
				size='small'
			/>
			<StyledDivider />
			<StyledInput
				id='photo1'
				name='photo1'
				{...register('photo1')}
				label='Photo'
				variant='outlined'
				size='small'
			/>
			<StyledDivider />
			<StyledInput
				id='photo2'
				{...register('photo2')}
				label='Photo'
				variant='outlined'
				size='small'
			/>
			<StyledDivider />
			<StyledInput
				id='photo3'
				{...register('photo3')}
				label='Photo'
				variant='outlined'
				size='small'
			/>
			<StyledDivider />
			<StyledInput
				id='video'
				{...register('video')}
				label='Video'
				variant='outlined'
				size='small'
			/>
			<StyledDivider />
			<StyledInput
				id='audio'
				{...register('audio')}
				label='Audio'
				variant='outlined'
				size='small'
			/>
			<StyledDivider />
			<StyledNewPlaceButton type='submit'>CREATE</StyledNewPlaceButton>
		</StyledContainer>
	)
}

export default NewPlace

const StyledContainer = styled.form`
	max-height: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`

const StyledInput = styled(TextField)`
	&& {
		${({ theme }) => `

      width: 90%;
	

    &:hover label {
			transition: all .3s;
      color: ${theme.palette.info.main}
    }
    `};
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
const StyledNewPlaceButton = styled(Button)`
	&& {
		${({ theme }) => `{
		width: 90%;
		background: ${theme.palette.info.main};
		color: #fff;
		
		&:hover {
			background: ${theme.palette.info.light};
		}
	}`}
	}
`
