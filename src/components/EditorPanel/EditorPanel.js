import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Title from './Title'
import Description from './Description'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
	editor: {
		height: '100%',

		'& > div': {
			marginTop: '20px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			// background: 'green',
		},
	},
	titleContainer: {
		width: '90%',
	},

	editBtnContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
	},

	editBtn: {
		marginRight: '20px',
		background: theme.palette.info.main,

		'&:hover': {
			background: theme.palette.info.light,
		},
	},

	divider: {
		width: '90%',
		height: '1px',
		background: '#cccccc',
		margin: '20px 0',
	},
}))

const EditorPanel = ({ data }) => {
	const classes = useStyles()
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
		<div className={classes.editor}>
			<div>
				<div className={classes.titleContainer}>
					<Title title={title} onTitleChange={onTitleChange} />
					<div className={classes.editBtnContainer}>
						<Button
							className={classes.editBtn}
							variant='contained'
							color='primary'
							onClick={onTitleEditHandle}>
							Edit
						</Button>
					</div>
				</div>
				<div className={classes.divider} />
				<div className={classes.titleContainer}>
					<Description
						description={description}
						onDescriptionChange={onDescriptionChange}
					/>
					<div className={classes.editBtnContainer}>
						<Button
							className={classes.editBtn}
							variant='contained'
							color='primary'
							onClick={onDescriptionEditHandle}>
							Edit
						</Button>
					</div>
				</div>
				<div className={classes.divider} />
			</div>
		</div>
	)
}

export default EditorPanel
