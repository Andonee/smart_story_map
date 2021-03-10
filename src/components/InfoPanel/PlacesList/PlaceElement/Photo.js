import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import VisibilityIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles({
	container: {
		position: 'relative',
	},
	img: {
		width: '100%',
		marginBottom: '10px',

		'&:hover': {
			cursor: 'pointer',
			background: 'transparentize',
		},
	},
	visibility: {
		position: 'absolute',
		color: '#fff',
		top: '5px',
		left: '5px',
	},
})

const Photo = ({ photo, open }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<VisibilityIcon className={classes.visibility} />
			<img src={photo} className={classes.img} onClick={open} />
		</div>
	)
}

export default Photo
