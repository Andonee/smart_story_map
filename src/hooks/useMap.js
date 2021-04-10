import { useEffect, useState } from 'react'

const useMap = (mapContainer) => {
	const [map, setMap] = useState()
	const [mapUrl, setMapUrl] = useState(
		'https://map.nmaps.pl/carto.NVYBik/-4G0QGiVu2'
	)
	const [currentMap, setCurrentMap] = useState('UgKM__BPXk')

	useEffect(() => {
		const url = window.location.href
		let options

		const authenticator = window.opalSdk.MapAuthenticator.fromUrl(mapUrl)
		if (url.includes('@')) {
			// const urlSplit = url.split('@')
			// const urlCoordinates = urlSplit[1].split(',')
			// const [lng, lat, zoom] = urlCoordinates
			// let lngFloat = parseFloat(lng)
			//let latpositive = urlCoordinates[2].substring(1)
			// let latFloat = parseFloat(lat)
			// let zoomFloat = parseFloat(zoom.slice(0, -1))
			// options = {
			// 	container: mapContainer,
			// 	center: [latFloat, lngFloat],
			// 	zoom: zoomFloat,
			// }
		} else {
			options = {
				container: mapContainer,
			}
		}

		let mapApi

		function onCreate(map) {
			mapApi = map
			setMap(mapApi)
		}

		window.opalSdk
			.createMap(authenticator, options)
			.then(onCreate)
			.catch((e) => console.error('Oups', e))

		return () => map && window.opalSdk.destroyMap(map)
	}, [currentMap, mapContainer])

	return map
}

export default useMap
