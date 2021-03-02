import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PlacesList from './PlacesList/PlacesList'
import Timeline from './Timeline/Timeline'

const useStyles = makeStyles({
	info: {
		height: '100%',
		overflow: 'scroll',
	},
})

const Sidebar = ({ spatialData }) => {
	let renderComponent
	if (spatialData.type === 'story map') {
		renderComponent = <PlacesList spatialData={spatialData} />
	} else if (spatialData.type === 'timeline') {
		renderComponent = <Timeline spatialData={spatialData} />
	}
	const classes = useStyles()
	return <div className={classes.info}>{renderComponent}</div>
}

export default Sidebar
