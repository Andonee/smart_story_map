import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	video: {
		padding: '20px 40px',
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
				frameborder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowfullscreen></iframe>
		</div>
	)
}

export default Video
