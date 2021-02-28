import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	editor: {
		background: 'green',
		height: '100%',
	},
})

const EditorPanel = () => {
	const classes = useStyles()
	return <div className={classes.editor}>EditorPanel</div>
}

export default EditorPanel
