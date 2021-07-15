import TextField from '@material-ui/core/TextField'
import styled from 'styled-components/macro'
import { useForm, Controller } from 'react-hook-form'
import CustomButton from '../../UI/CustomButton'
import translate from '../../../utils/translate'

const NewPlace = ({ onCreateNewObject, editedPlace, onUpdateObject }) => {
	const { register, handleSubmit, getValues, setValue, control } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: editedPlace,
	})

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
			date: data.date?.target ? data.date.target.value : data.date,
			address: data.address?.target ? data.address.target.value : data.address,
		}
		if (editedPlace?.id) {
			onUpdateObject(objectProps)
		} else {
			onCreateNewObject(objectProps)
		}
	}

	return (
		<StyledContainer onSubmit={handleSubmit(onSubmit)}>
			<Controller
				render={() => (
					<StyledInput
						id='title'
						label={translate('form.label.title', 'Title')}
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
						label={translate('form.label.description', 'Description')}
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
			{/* <StyledDivider />
			<input type='file' accept='image/png, image/jpeg' /> */}
			<StyledDivider />
			<Controller
				render={() => (
					<StyledInput
						id='photo1'
						name='photo1'
						{...register('photo1')}
						label={translate('form.label.photo', 'Photo')}
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
						label={translate('form.label.photo', 'Photo')}
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
						label={translate('form.label.photo', 'Photo')}
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
						label={translate('form.label.video', 'Video')}
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
						label={translate('form.label.audio', 'Audio')}
						variant='outlined'
						size='small'
						defaultValue={getValues().audio ? getValues().audio : ''}
						onChange={val => setValue('audio', val)}
					/>
				)}
				name='audio'
				control={control}
			/>
			<>
				<StyledDivider />
				<Controller
					render={() => (
						<StyledInput
							id='address'
							{...register('address')}
							label={translate('form.label.address', 'Address')}
							variant='outlined'
							size='small'
							defaultValue={getValues().address ? getValues().address : ''}
							onChange={val => setValue('address', val)}
						/>
					)}
					name='address'
					control={control}
				/>
			</>
			<>
				<StyledDivider />
				<Controller
					render={() => (
						<StyledInput
							id='date'
							{...register('date')}
							label={translate('form.label.date', 'Date')}
							variant='outlined'
							size='small'
							defaultValue={getValues().date ? getValues().date : ''}
							onChange={val => setValue('date', val)}
						/>
					)}
					name='date'
					control={control}
				/>
			</>
			<StyledDivider />
			{editedPlace?.id ? (
				<CustomButton
					text={translate('ui.button.save', 'Save')}
					size='small'
					variant='contained'
					type='submit'
					width='90%'
				/>
			) : (
				<CustomButton
					text={translate('ui.button.addPlace', 'Add Place')}
					size='small'
					variant='contained'
					type='submit'
					width='90%'
				/>
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
