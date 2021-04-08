import React, { useEffect, useState, useCallback } from 'react'
import useMap from '../../hooks/useMap'
import { filter as rxFilter } from 'rxjs/operators'
import styled from 'styled-components'

const Map = ({ spatialData }) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [places, setPlaces] = useState(
		window.opalSdk.createDataset('places', { data: spatialData })
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

		// Add icon to map

		// console.log(map.images().list())
		// fetch('https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png')
		// 	.then(response => response.arrayBuffer())
		// 	.then(data => {
		// 		const blob = new window.Blob([new Uint8Array(data)], {
		// 			type: 'image/png',
		// 		})
		// 		return window.createImageBitmap(blob)
		// 	})
		// 	.then(image => map.images().add('catPrezesa', image))
		// 	.then(() => {
		// 		console.log(map.images().list())
		// 	})
		addData()
	})

	useEffect(() => {
		if (places) {
			places.setData(spatialData)
		}
	}, [spatialData, places])
	return <Wrapper id='map'></Wrapper>
}

export default Map

const Wrapper = styled.div`
	height: 100%;
`
