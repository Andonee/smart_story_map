import React, { useEffect, useState, useCallback } from 'react'
import useMap from '../../hooks/useMap'
import { filter as rxFilter } from 'rxjs/operators'
import styled from 'styled-components'
import { useMapClick, useMapHover } from '../../hooks/useMapEvents'

const Map = ({
	setMapInstance,
	onAddNewObject,
	newObject,
	appData,
	onObjectClickHandler,
}) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [places] = useState(
		window.opalSdk.createDataset('places', { data: appData.map })
	)
	const [icon, setIcon] = useState()
	const [sizeIcon, setSizeIcon] = useState()
	const [iconIsChanged, setIconIsChanged] = useState(false)

	let map = useMap('map', appData.info.basemap)

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
	}, [map, appData.info.icons.icon, icon, appData.info.basemap, setMapInstance])

	useEffect(() => {
		if (map) {
			setIcon(appData.info.icons.icon)
			// map.layer('places').remove()
			// addData()
			setIconIsChanged(true)
		}
	}, [appData.info.icons.icon, map])

	useEffect(() => {
		if (map) {
			console.log('iconSize', appData.info.icons.size)
			setSizeIcon(parseFloat(appData.info.icons.size) / 10)
			setIconIsChanged(true)
		}
	}, [appData.info.icons.size, map])

	const addData = useCallback(() => {
		// console.log('asasdsdasd', sizeIcon)
		if (!(map || places || icon)) return
		console.log('addData')
		map.addData(places, {
			id: 'places',
			type: 'symbol',
			layout: {
				'icon-allow-overlap': true,
				'text-allow-overlap': true,
				'icon-size': sizeIcon,
				'icon-image': `${icon}`,
			},
		})
	}, [map, places, icon, sizeIcon])

	useEffect(() => {
		if (iconIsChanged) {
			addData()
			setIconIsChanged(false)
		}
		setIconIsChanged(false)
	}, [iconIsChanged, addData])

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
			places.setData(appData.map)
		}
	}, [appData, places, icon])

	const onMapClickHandler = e => {
		if (newObject.addNewObject) {
			onAddNewObject(e.data)
		} else {
			const layers = ['places']

			const { x, y } = e.data.point
			const iconCoords = [
				[x - 5, y - 5],
				[x + 5, y + 5],
			]

			const target = map.query(iconCoords, { layers })

			console.log(target)
			onObjectClickHandler(target)
		}
	}

	const onObjectHover = e => {
		const layers = ['places']
		const { x, y } = e.data.point
		const iconCoords = [
			[x - 5, y - 5],
			[x + 5, y + 5],
		]
		const target = map.query(iconCoords, { layers })
		if (target.length > 0) {
			map.canvas.style.cursor = 'pointer'
		} else {
			map.canvas.style.cursor = 'default'
		}
	}

	useMapClick(map, onMapClickHandler)

	useMapHover(map, onObjectHover)

	return <StyledWrapper id='map'></StyledWrapper>
}

export default Map

const StyledWrapper = styled.div`
	height: 100%;
`
