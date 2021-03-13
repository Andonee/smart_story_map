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
	title: {
		fontSize: '28px',
		marginLeft: '20px',
	},
	inputContainer: {
		height: '50px',
		display: 'flex',
	},
})

const Title = ({ title, onTitleChange }) => {
	const classes = useStyles()
	return (
		<div className={classes.inputContainer}>
			{title.isEdited ? (
				<InputField
					id='map-title'
					name='title'
					label='Map Title'
					variant='outlined'
					defaultValue={title.title}
					onChange={onTitleChange}
					inputProps={{ maxLength: 120 }}
					size='small'
				/>
			) : (
				<div className={classes.title}>{title.title}</div>
			)}
		</div>
	)
}

export default Title
