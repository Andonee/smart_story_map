import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	video: {
		padding: '20px 20px',
	},
}))

const Video = ({ video }) => {
	const classes = useStyles()
	return (
		<div className={classes.video}>
			<iframe
				title={video}
				width='100%'
				height='200'
				src={video}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'></iframe>
		</div>
	)
}

export default Video
