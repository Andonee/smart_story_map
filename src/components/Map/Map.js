import React, { useEffect, useState, useCallback } from 'react'
import useMap from '../../hooks/useMap'
import { filter as rxFilter, first } from 'rxjs/operators'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	map: {
		background: 'green',
		height: '100%',
	},
})

const Map = () => {
	const classes = useStyles()
	const [isLoaded, setIsLoaded] = useState(false)

	const map = useMap('map')

	useEffect(() => {
		if (!map) return

		const subsription = map.event$
			.pipe(rxFilter(({ type }) => 'load' === type))
			.subscribe(() => setIsLoaded(true))

		return () => {
			setIsLoaded(false)
			subsription.unsubscribe()
		}
	}, [map])
	return <div className={classes.map} id='map'></div>
}

export default Map
