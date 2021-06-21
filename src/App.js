import { useState, useEffect } from 'react'

import { nanoid } from 'nanoid'
import styled from 'styled-components'
import produce from 'immer'
import { useImmerReducer } from 'use-immer'

import InfoPanel from './components/InfoPanel/InfoPanel'
import EditorPanel from './components/EditorPanel/EditorPanel'
import MobilePanel from './components/MobilePanel/MobilePanel'
import Map from './components/Map/Map'
import ImageModal from './components/UI/ImageModal'
import CustomModal from './components/UI/CustomModal'
import NewPlace from './components/EditorPanel/NewPlace/NewPlace'
import Spinner from './components/UI/Spinner'
import FetchDataError from './components/UI/FetchDataError'
import MapTitle from './components/UI/MapTitle'
import MapDescription from './components/UI/MapDescription'
import Toolbox from './components/UI/Toolbox'

import RemoveObjectConfirmation from './components/EditorPanel/RemoveObjectConfirmation/RemoveObjectConfirmation'
import useHttp from './hooks/useHttp'
import timelineReducer, {
	timelineInitialState,
	timelineReducerActions,
} from './store/timelineReducer'
import dispatchMatcher from './utils/dispatchMatcher'
import { isMobile } from 'react-device-detect'

function App() {
	const [mapInstance, setMapInstance] = useState()
	const [isImageModalOpen, setIsImageModalOpen] = useState({
		isOpen: false,
		img: '',
	})
	const [isNewObjectModalOpen, setIsNewObjectModalOpen] = useState(false)
	const [isRemoveObjectModalOpen, setIsRemoveObjectModalOpen] = useState(false)
	const [isRemoveIconModalOpen, setIsRemoveIconModalOpen] = useState(false)
	const [newObject, setNewObject] = useState({
		addNewObject: false,
		id: '',
		title: '',
		text: '',
		image1: '',
		image2: '',
		image3: '',
		audio: '',
		coordinates: [],
	})
	const [editedPlace, setEditedPlace] = useState({
		idx: '',
		data: {},
		action: '',
	})
	const [appData, dispatchAppData] = useImmerReducer(
		timelineReducer,
		timelineInitialState
	)
	const [selectedPlace, setSelectedPlace] = useState()
	const [visiblePlace, setVisiblePlace] = useState([])

	const { error, sendRequest } = useHttp()

	useEffect(() => {
		sendRequest({ url: 'http://localhost:5001/maps/1' }).then(res => {
			console.log('RES', res)
			dispatchMatcher(dispatchAppData, timelineReducerActions.FETCH_DATA)
			if (res?.status === 200) {
				const font = res.data.data.style.font.family
				const link = document.createElement('link')
				link.rel = 'stylesheet'
				link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`
				document.getElementsByTagName('head')[0].appendChild(link)
				document.getElementsByTagName(
					'body'
				)[0].style.fontFamily = `${res.data.data.style.font.family}`

				dispatchMatcher(
					dispatchAppData,
					timelineReducerActions.FETCH_SUCCESS,
					res.data
				)
			} else {
				dispatchMatcher(dispatchAppData, timelineReducerActions.FETCH_ERROR)
			}
		})
	}, [sendRequest, dispatchAppData])

	useEffect(() => {
		if (newObject.id && newObject.coordinates.length === 2) {
			setIsNewObjectModalOpen(true)
		}
	}, [newObject])

	useEffect(() => {
		if (editedPlace.idx !== '' && editedPlace.action === 'edit') {
			setIsNewObjectModalOpen(true)
		}
	}, [editedPlace])

	useEffect(() => {
		if (editedPlace.idx !== '' && editedPlace.action === 'remove') {
			setIsRemoveObjectModalOpen(true)
		}
	}, [editedPlace])

	const imageOpenHandler = e => {
		const image = e.target.src
		setIsImageModalOpen({
			isOpen: true,
			img: image,
		})
	}

	const onAddNewObject = props => {
		setNewObject(
			produce(newObject, draft => {
				draft.id = nanoid(7)
				draft.coordinates = [props.lngLat.lng, props.lngLat.lat]
			})
		)
	}

	const onCreateNewObject = props => {
		const { title, description, photo1, photo2, photo3, video, audio, date } =
			props
		const { id, coordinates } = newObject
		const createNewObject = {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates,
			},
			properties: {
				id,
				title,
				description,
				photo1,
				photo2,
				photo3,
				video,
				audio,
			},
		}
		if (appData.spatialData.type === 'timeline') {
			createNewObject.properties.date = date
		}
		console.log(createNewObject)
		setIsNewObjectModalOpen(false)

		dispatchMatcher(
			dispatchAppData,
			timelineReducerActions.ADD_PLACE,
			createNewObject
		)

		setNewObject(
			produce(newObject, draft => {
				draft.addNewObject = false
				draft.id = ''
				draft.coordinates = []
			})
		)
	}

	const onUpdateObject = props => {
		const edited = {
			id: editedPlace.idx,
			value: props,
		}
		dispatchMatcher(
			dispatchAppData,
			timelineReducerActions.UPDATE_PLACE,
			edited
		)
		setIsNewObjectModalOpen(false)
	}

	const onPostHandler = async () => {
		try {
			sendRequest({
				method: 'PATCH',
				url: `http://localhost:5001/maps/2`,
				body: appData.spatialData,
			}).then(res => res)
		} catch {
			alert('Something went wrong')
		}
	}

	const onModalClose = () => {
		setIsNewObjectModalOpen(false)

		setNewObject(
			produce(newObject, draft => {
				draft.addNewObject = false
				draft.id = ''
				draft.coordinates = []
			})
		)
		onRemoveObjectHandler('NO')
	}

	const onRemoveObjectHandler = action => {
		if (action === 'NO') {
			setIsRemoveObjectModalOpen(false)
			setEditedPlace({
				idx: '',
				data: {},
				action: '',
			})
		} else {
			setIsRemoveObjectModalOpen(false)

			dispatchMatcher(
				dispatchAppData,
				timelineReducerActions.DELETE_PLACE,
				editedPlace.id
			)
		}
	}

	const onRemoveIconHandler = action => {
		if (action === 'NO') {
			setIsRemoveIconModalOpen(false)
		} else {
			setIsRemoveIconModalOpen(false)

			mapInstance.layer('places').remove()

			dispatchMatcher(
				dispatchAppData,
				timelineReducerActions.DELETE_ICON,
				appData.spatialData.data.style.selectedIcon.id
			)

			const defaultIcon = {
				id: '1',
				mapId: appData.spatialData.id,
				name: 'inne',
				src: 'data:image/svg+xml;base64,PHN2ZyBpZD0iV2Fyc3R3YV8xIiBkYXRhLW5hbWU9IldhcnN0d2EgMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzguODA3NSIgaGVpZ2h0PSI1OC44MTEzIiB2aWV3Qm94PSIwIDAgMzguODA3NSA1OC44MTEzIj48dGl0bGU+aW5uZV8wMTwvdGl0bGU+PGNpcmNsZSBjeD0iNS45MjUyIiBjeT0iNS4yNDcyIiByPSIzLjY2ODciIGZpbGw9IiM2ZDZkNmQiLz48cmVjdCB4PSI1LjEyNzciIHk9IjcuOTQ0NSIgd2lkdGg9IjEuNzU0NiIgaGVpZ2h0PSI0OS4yODgzIiByeD0iMC44NzczIiByeT0iMC44NzczIiBmaWxsPSIjNmQ2ZDZkIi8+PHBhdGggZD0iTTM2LjU1MSwyMS44NDMzYy4wMDMtMS45ODE3LTMuODg3Ni0yLjY2LTUuOTgxMS01LjIwMjItMS41NjIxLTEuODk2Ny0xLjE5NjgtNS45NjM0LTEuMTk2OC01Ljk2MzRINi43MjI4TDYuNjQsMjEuODI3NGgwVjIxLjg2aDBsLjA4MjYsMTEuMTdoMjIuNjVzLS4zNjUzLTQuMDY2NywxLjE5NjgtNS45NjM1YzIuMDkzNS0yLjU0MjIsNS45ODQxLTMuMjIsNS45ODExLTUuMjAyMloiIGZpbGw9IiM2ZDZkNmQiLz48cGF0aCBkPSJNMTguNTQ4MiwyNC45OTUzbDQuMjE4NiwyLjU0NjMtMS4xMTk1LTQuNzk4OSwzLjcyNzItMy4yMjg5LTQuOTA4MS0uNDE2NC0xLjkxODItNC41MjU4TDE2LjYzLDE5LjA5NzRsLTQuOTA4MS40MTY0LDMuNzI3MSwzLjIyODktMS4xMiw0Ljc5ODlaIiBmaWxsPSIjZmZmNmU5Ii8+PC9zdmc+',
			}

			dispatchMatcher(
				dispatchAppData,
				timelineReducerActions.SET_ICON,
				defaultIcon
			)
		}
	}

	const onPlaceEdit = (place, action) => {
		const idx = appData.spatialData.data.map.features.findIndex(
			el => el.properties.id === place.id
		)
		setEditedPlace({
			idx: idx,
			data: appData.spatialData.data.map.features[idx].properties,
			action: action,
		})
	}

	const isElementOnScreen = id => {
		var element = document.getElementById(id)
		var bounds = element.getBoundingClientRect()
		return bounds.top < window.innerHeight && bounds.bottom > 0
	}
	const onScrollFlyTo = () => {
		if (visiblePlace.length === 0) {
			mapInstance.flyTo({
				center: [visiblePlace[0], visiblePlace[1]],
				zoom: 16,
			})
		} else {
			mapInstance.flyTo({
				center: [visiblePlace[0][0], visiblePlace[0][1]],
				zoom: 16,
			})
		}
	}

	const onScrollHandler = () => {
		let visiblePlaces = []
		appData.spatialData.data.map.features.map(place => {
			let id = place.properties.id
			if (isElementOnScreen(id)) {
				visiblePlaces.push(place.geometry.coordinates)
				setVisiblePlace(visiblePlaces)
				if (!selectedPlace) {
					onScrollFlyTo()
				} else {
					const panel = document.getElementById('info-panel')
					panel.onscroll = function (e) {
						const htmlCollection = e.target.children[0].children
						const elementsArray = Array.from(htmlCollection)

						elementsArray.forEach(el => {
							if (selectedPlace.properties.id === el.id) {
								onScrollFlyTo()
							}
						})
					}
				}

				const visibleElement = document.getElementById(id)
				if (id !== appData.spatialData.data.map.features[0].properties.id) {
					visibleElement.classList.add('show')
				}
			} else if (!isElementOnScreen(id)) {
				const invisibleElement = document.getElementById(id)
				invisibleElement.classList.remove('show')
			}
			return null
		})
	}

	const onObjectClickHandler = object => {
		// mapInstance.flyTo({
		// 	center: object[0].geometry.coordinates,
		// 	zoom: 16,
		// })

		if (!isMobile) {
			console.log('Object', object)
			document.getElementById(`${object[0]?.properties.id}`).scrollIntoView({
				behavior: 'smooth',
			})
			setSelectedPlace(object[0])
		} else {
			setSelectedPlace(object[0])
		}
	}

	return (
		<StyledWrapper className='apply-font'>
			{appData.isLoading && <Spinner />}
			{error && <FetchDataError />}
			<Toolbox />
			{!appData.isLoading && (
				<>
					{!isMobile && (
						<StyledInfoPanel
							order={appData.spatialData.data?.style.panelsOrder.infoPanel}
							color={appData.spatialData.data?.style.backgroundColor}
							type={appData.spatialData.type}>
							{appData.spatialData.data && (
								<InfoPanel
									spatialData={appData.spatialData}
									imageOpenHandler={imageOpenHandler}
									onScrollHandler={onScrollHandler}
								/>
							)}
						</StyledInfoPanel>
					)}
					<StyledMap>
						{appData.spatialData.data?.map.features &&
							appData.spatialData.data?.style.basemap && (
								<>
									{appData.spatialData.data?.info.title && (
										<MapTitle title={appData.spatialData.data?.info.title} />
									)}
									<MapDescription
										description={appData.spatialData.data?.info.description}
									/>
									<Map
										setMapInstance={setMapInstance}
										onAddNewObject={onAddNewObject}
										newObject={newObject}
										appData={appData.spatialData.data}
										onObjectClickHandler={onObjectClickHandler}
									/>
								</>
							)}
					</StyledMap>
					{appData.spatialData.data && (
						<>
							{!isMobile && (
								<StyledEditorPanel
									order={appData.spatialData.data.style.panelsOrder.editorPanel}
									color={appData.spatialData.data.style.backgroundColor}>
									<EditorPanel
										setNewObject={setNewObject}
										newObject={newObject}
										onPostHandler={onPostHandler}
										onPlaceEdit={onPlaceEdit}
										dispatchAppData={dispatchAppData}
										appData={appData}
										mapInstance={mapInstance}
										setIsRemoveIconModalOpen={setIsRemoveIconModalOpen}
									/>
								</StyledEditorPanel>
							)}
						</>
					)}
					{isMobile && (
						<MobilePanel
							spatialData={appData.spatialData}
							imageOpenHandler={imageOpenHandler}
							selectedPlace={selectedPlace}
						/>
					)}
					<ImageModal
						isOpen={isImageModalOpen}
						setIsOpen={setIsImageModalOpen}
					/>
					<CustomModal
						onModalClose={onModalClose}
						modalIsOpen={isNewObjectModalOpen}>
						<NewPlace
							onCreateNewObject={onCreateNewObject}
							editedPlace={editedPlace.data}
							onUpdateObject={onUpdateObject}
							type={appData.spatialData.type}
						/>
					</CustomModal>
					<CustomModal
						onModalClose={onModalClose}
						modalIsOpen={isRemoveObjectModalOpen}>
						<RemoveObjectConfirmation
							confirmationHandler={onRemoveObjectHandler}
							content='Are you sure you want to remove this object?'
						/>
					</CustomModal>
					<CustomModal
						onModalClose={onModalClose}
						modalIsOpen={isRemoveIconModalOpen}>
						<RemoveObjectConfirmation
							confirmationHandler={onRemoveIconHandler}
							content='Are you sure you want to remove this icon?'
						/>
					</CustomModal>
				</>
			)}
		</StyledWrapper>
	)
}

export default App

const StyledInfoPanel = styled.div`
	&& {
		width: ${props => (props.type === 'timeline' ? '600px' : '400px')};
		${
			'' /* max-width: ${props => (props.type === 'timeline' ? '50%' : '50%')}; */
		}
		order: ${props => props.order || -1};
		background: ${props => props.color || '#fff'};
	}
`

const StyledEditorPanel = styled.div`
	&& {
		width: 350px;
		order: ${props => props.order || 1};
		overflow: scroll;
		${props => props.color || '#fff'}
	}
`
const StyledMap = styled.div`
	&& {
		position: relative;
		flex-grow: 1;
		order: 0;
	}
`

const StyledWrapper = styled.div`
	&& {
		display: flex;
		overflow: hidden;
	}
`
