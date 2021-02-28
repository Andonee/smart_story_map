import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	map: {
		background: 'green',
		height: '100%',
	},
})

const Map = () => {
	const classes = useStyles()
	return <div className={classes.map}>Map</div>
}

export default Map
