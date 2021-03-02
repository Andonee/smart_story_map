import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	img: {
		width: '100%',
		marginBottom: '10px',
	},
})

const Photo = ({ photo }) => {
	const classes = useStyles()
	return <img src={photo} className={classes.img} />
}

export default Photo
