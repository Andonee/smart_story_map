import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	description: {
		padding: '20px 20px',
		textAlign: 'justify',
		color: theme.palette.primary.main,
	},
}))
const PlaceDescription = ({ description }) => {
	const classes = useStyles()
	return <div className={classes.description}>{description}</div>
}

export default PlaceDescription
