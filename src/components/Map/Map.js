import React, { useEffect, useState, useCallback } from 'react'
import useMap from '../../hooks/useMap'
import { filter as rxFilter } from 'rxjs/operators'
import styled from 'styled-components'

const Map = ({ spatialData, mapIcon, setMapInstance }) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [places, setPlaces] = useState(
		window.opalSdk.createDataset('places', { data: spatialData })
	)
	const [icon, setIcon] = useState()
	const [iconIsChanged, setIconIsChanged] = useState(false)

	console.log(mapIcon)
	const map = useMap('map')

	useEffect(() => {
		if (!map) return

		setMapInstance(map)
		const subsription = map.event$
			.pipe(rxFilter(({ type }) => 'load' === type))
			.subscribe(() => setIsLoaded(true))

		return () => {
			setIsLoaded(false)
			subsription.unsubscribe()
		}
	}, [map, mapIcon, icon])

	useEffect(() => {
		if (map) {
			setIcon(mapIcon)
			// map.layer('places').remove()
			// addData()
			setIconIsChanged(true)
		}
	}, [mapIcon, map])

	useEffect(() => {
		if (iconIsChanged) {
			addData()
			setIconIsChanged(false)
		}
		setIconIsChanged(false)
	}, [iconIsChanged])

	const addData = useCallback(() => {
		if (!(map || places || icon)) return
		console.log('addData')
		map.addData(places, {
			id: 'places',
			type: 'symbol',
			layout: {
				// 'icon-size': ['interpolate', ['linear'], ['zoom'], 14.9, 0, 15, 1],
				'icon-image': `${icon}`,
			},
		})
	}, [map, places, icon])

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
	}, [addData, isLoaded, icon])

	useEffect(() => {
		if (places) {
			console.log('setData')
			places.setData(spatialData)
		}
	}, [spatialData, places, icon])

	return <StyledWrapper id='map'></StyledWrapper>
}

export default Map

const StyledWrapper = styled.div`
	height: 100%;
`
