import React, { useEffect, useState, useCallback } from 'react'
import useMap from '../../hooks/useMap'
import { filter as rxFilter } from 'rxjs/operators'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	map: {
		height: '100%',
	},
})

const Map = ({ data }) => {
	const classes = useStyles()
	const [isLoaded, setIsLoaded] = useState(false)
	const [places, setPlaces] = useState(
		window.opalSdk.createDataset('places', { data })
	)

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

	const addData = useCallback(() => {
		if (!(map || places)) return

		map.addData(places, {
			id: 'places',
			type: 'symbol',
			layout: {
				// 'icon-size': ['interpolate', ['linear'], ['zoom'], 14.9, 0, 15, 1],
				'icon-image': 'swietlice_01',
			},
		})
	}, [map, places])

	useEffect(() => {
		if (!isLoaded) return

		addData()
	})

	useEffect(() => {
		if (places) {
			places.setData(data)
		}
	}, [data, places])
	return <div className={classes.map} id='map'></div>
}

export default Map
