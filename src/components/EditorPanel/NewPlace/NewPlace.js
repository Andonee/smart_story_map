import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { useForm, Controller } from 'react-hook-form'
import Button from '@material-ui/core/Button'

const NewPlace = ({ onCreateNewObject, editedPlace, onUpdateObject }) => {
	const { register, handleSubmit, getValues, setValue, control } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: editedPlace,
	})

	console.log('EDITED PLACE', editedPlace)
	const onSubmit = data => {
		const objectProps = {
			id: editedPlace.id,
			title: data.title.target ? data.title.target.value : data.title,
			description: data.description?.target
				? data.description.target.value
				: data.description,
			photo1: data.photo1?.target ? data.photo1.target.value : data.photo1,
			photo2: data.photo2?.target ? data.photo2.target.value : data.photo2,
			photo3: data.photo3?.target ? data.photo3.target.value : data.photo3,
			video: data.video?.target ? data.video.target.value : data.video,
			audio: data.audio?.target ? data.audio.target.value : data.audio,
		}
		if (editedPlace?.id) {
			onUpdateObject(objectProps)
			console.log('update', objectProps)
		} else {
			onCreateNewObject(objectProps)
			// console.log('create', objectProps)
		}
	}

	return (
		<StyledContainer onSubmit={handleSubmit(onSubmit)}>
			<Controller
				render={() => (
					<StyledInput
						id='title'
						label='title'
						variant='outlined'
						size='small'
						{...register('title')}
						defaultValue={getValues().title ? getValues().title : ''}
						onChange={val => setValue('title', val)}
					/>
				)}
				name='title'
				control={control}
			/>

			<StyledDivider />
			<Controller
				render={() => (
					<StyledInput
						id='description'
						{...register('description')}
						label='description'
						multiline
						rows={4}
						variant='outlined'
						size='small'
						defaultValue={
							getValues().description ? getValues().description : ''
						}
						onChange={val => setValue('description', val)}
					/>
				)}
				name='description'
				control={control}
			/>
			<StyledDivider />
			<Controller
				render={() => (
					<StyledInput
						id='photo1'
						name='photo1'
						{...register('photo1')}
						label='Photo'
						variant='outlined'
						size='small'
						defaultValue={getValues().photo1 ? getValues().photo1 : ''}
						onChange={val => setValue('photo1', val)}
					/>
				)}
				name='photo1'
				control={control}
			/>
			<StyledDivider />
			<Controller
				render={() => (
					<StyledInput
						id='photo2'
						{...register('photo2')}
						label='Photo'
						variant='outlined'
						size='small'
						defaultValue={getValues().photo2 ? getValues().photo2 : ''}
						onChange={val => setValue('photo2', val)}
					/>
				)}
				name='photo2'
				control={control}
			/>
			<StyledDivider />
			<Controller
				render={() => (
					<StyledInput
						id='photo3'
						{...register('photo3')}
						label='Photo'
						variant='outlined'
						size='small'
						defaultValue={getValues().photo3 ? getValues().photo3 : ''}
						onChange={val => setValue('photo3', val)}
					/>
				)}
				name='photo3'
				control={control}
			/>
			<StyledDivider />
			<Controller
				render={() => (
					<StyledInput
						id='video'
						{...register('video')}
						label='Video'
						variant='outlined'
						size='small'
						defaultValue={getValues().video ? getValues().video : ''}
						onChange={val => setValue('video', val)}
					/>
				)}
				name='video'
				control={control}
			/>
			<StyledDivider />
			<Controller
				render={() => (
					<StyledInput
						id='audio'
						{...register('audio')}
						label='Audio'
						variant='outlined'
						size='small'
						defaultValue={getValues().audio ? getValues().audio : ''}
						onChange={val => setValue('audio', val)}
					/>
				)}
				name='audio'
				control={control}
			/>
			<StyledDivider />
			{editedPlace?.id ? (
				<StyledNewPlaceButton type='submit'>EDIT</StyledNewPlaceButton>
			) : (
				<StyledNewPlaceButton type='submit'>CREATE</StyledNewPlaceButton>
			)}
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
