import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const InputField = withStyles(theme => ({
	root: {
		width: '90%',
		marginLeft: 'auto',
		marginRight: 'auto',
		'& label': {
			color: theme.palette.primary.main,
		},
		'& label.Mui-focused': {
			color: theme.palette.primary.main,
			// fontSize: '12px',
		},
		'& input': {
			color: theme.palette.primary.main,
		},

		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: theme.palette.primary.main,
			},
			'&:hover fieldset': {
				borderColor: theme.palette.primary.main,
			},
		},
	},
}))(TextField)

const useStyles = makeStyles({
	description: {
		fontSize: '16px',
		marginLeft: '20px',
	},
	inputContainer: {
		height: '150px',
		display: 'flex',
	},
})

const Title = ({ description, onDescriptionChange }) => {
	const classes = useStyles()
	return (
		<div className={classes.inputContainer}>
			{description.isEdited ? (
				<InputField
					id='map-description'
					name='description'
					label='Map description'
					variant='outlined'
					multiline
					defaultValue={description.description}
					onChange={onDescriptionChange}
					inputProps={{ maxLength: 500 }}
					size='small'
					rows={5}
				/>
			) : (
				<div className={classes.description}>{description.description}</div>
			)}
		</div>
	)
}

export default Title
