import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	title: {
		color: theme.palette.primary.main,
		fontSize: '26px',
		padding: '20px',
		fontWeight: 'bold',
	},
}))

const PlaceName = ({ title }) => {
	const classes = useStyles()
	return <div className={classes.title}>{title}</div>
}

export default PlaceName
