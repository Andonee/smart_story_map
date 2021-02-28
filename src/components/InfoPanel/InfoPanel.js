import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	info: {
		background: 'green',
		height: '100%',
	},
})

const Sidebar = () => {
	const classes = useStyles()
	return <div className={classes.info}>Sidebar</div>
}

export default Sidebar
