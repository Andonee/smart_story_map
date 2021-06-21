import React, { useEffect, useState, useCallback } from 'react'
import useMap from '../../hooks/useMap'
import { filter as rxFilter } from 'rxjs/operators'
import styled from 'styled-components'
import { useMapClick, useMapHover, useMoveEnd } from '../../hooks/useMapEvents'
import { decode } from 'js-base64'

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
	const [selectedIconName, setSelectedIconName] = useState()

	let map = useMap('map', appData.style.basemap)

	let isFlying = false

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
	}, [
		map,
		// appData.style.selectedIcon.icon,
		// appData.style.icons,
		// icon,
		// appData.style.basemap,
		setMapInstance,
	])

	useEffect(() => {
		if (map) {
			setIcon(appData.style.selectedIcon.icon)
			setSelectedIconName(appData.style.selectedIcon.name)
			setIconIsChanged(true)
		}
	}, [appData.style.selectedIcon.icon, appData.style.selectedIcon.name, map])

	useEffect(() => {
		if (map) {
			setSizeIcon(parseFloat(appData.style.selectedIcon.size) / 10)
			setIconIsChanged(true)
		}
	}, [appData.style.selectedIcon.size, map])

	const addData = useCallback(() => {
		// console.log('asasdsdasd', sizeIcon)
		if (!(map || places || icon)) return

		map.addData(places, {
			id: 'places',
			type: 'symbol',
			layout: {
				'icon-allow-overlap': true,
				'text-allow-overlap': true,
				'icon-size': sizeIcon,
				'icon-image': selectedIconName,
			},
		})
	}, [map, places, icon, sizeIcon, selectedIconName])

	useEffect(() => {
		if (iconIsChanged) {
			setTimeout(() => addData(), 2000)
			// addData()
			setIconIsChanged(false)
		}
		setIconIsChanged(false)
	}, [iconIsChanged, addData])

	useEffect(() => {
		if (!isLoaded) return
		// Add icon to map

		const decoded = decode(icon)

		const imageWidth = decoded
			.split(' ')
			.filter(el => el.includes('width'))[0]
			.slice(7, -1)

		const imageHeight = decoded
			.split(' ')
			.filter(el => el.includes('height'))[0]
			.slice(8, -1)

		let img = new Image(`${imageWidth}`, `${imageHeight}`)
		img.src = `data:image/svg+xml;base64,${icon}`
		img.onload = () => map.images().add(selectedIconName, img)

		addData()
	}, [addData, isLoaded, icon, map, selectedIconName])

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

			const { x, y } = e.data?.point
			const iconCoords = [
				[x - 5, y - 5],
				[x + 5, y + 5],
			]

			const target = map.query(iconCoords, { layers })

			console.log('CLICK', target)
			if (target.length > 0) {
				onObjectClickHandler(target)
			}
		}
	}

	const onObjectHover = e => {
		const layers = ['places']
		const { x, y } = e.data?.point
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

	// useMoveEnd(map, onObjectHover)

	// useMoveEnd(map, onMapClickHandler)

	return <StyledWrapper id='map'></StyledWrapper>
}

export default Map

const StyledWrapper = styled.div`
	height: 100%;
`
