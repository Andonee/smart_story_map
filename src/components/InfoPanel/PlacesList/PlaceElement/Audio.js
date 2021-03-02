import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	audio: {
		padding: '20px 40px',
	},
})

const Audio = ({ audio }) => {
	const classes = useStyles()
	return (
		<audio controls className={classes.audio}>
			<source src={audio} type='audio/mpeg' />
		</audio>
	)
}

export default Audio
