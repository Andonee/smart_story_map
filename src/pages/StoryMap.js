import { useState, useEffect, useContext, useCallback } from 'react'

import { nanoid } from 'nanoid'
import styled from 'styled-components'
import produce from 'immer'
import { useImmerReducer } from 'use-immer'

import InfoPanel from '../components/InfoPanel/InfoPanel'
import EditorPanel from '../components/EditorPanel/EditorPanel'
import MobilePanel from '../components/MobilePanel/MobilePanel'
import Map from '../components/Map/Map'
import ImageModal from '../components/UI/ImageModal'
import CustomModal from '../components/UI/CustomModal'
import NewPlace from '../components/EditorPanel/NewPlace/NewPlace'
import Spinner from '../components/UI/Spinner'
import FetchDataError from '../components/UI/FetchDataError'
import MapTitle from '../components/UI/MapTitle'
import MapDescription from '../components/UI/MapDescription'
import Toolbox from '../components/UI/Toolbox'
import AddPlaceInfo from '../components/UI/AddPlaceInfo'

import RemoveObjectConfirmation from '../components/EditorPanel/RemoveObjectConfirmation/RemoveObjectConfirmation'
import useHttp from '../hooks/useHttp'
import timelineReducer, {
	timelineInitialState,
	timelineReducerActions,
} from '../store/timelineReducer'
import dispatchMatcher from '../utils/dispatchMatcher'
import { isMobile } from 'react-device-detect'
import translate from '../utils/translate'
import InfoIcon from '@material-ui/icons/Info'
import { Context } from '../components/UI/LanguageWrapper'
import TranslateIcon from '@material-ui/icons/Translate'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap'
import IconButton from '@material-ui/core/IconButton'
import { BaseUrl } from '../utils/baseUrl'
import { useHistory } from 'react-router-dom'
import AuthContext from '../store/auth-context'
import CustomButton from '../components/UI/CustomButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { getBoundingBox } from '../utils/getBoundingBox'

function App() {
	const history = useHistory()
	const authContext = useContext(AuthContext)
	const [mapInstance, setMapInstance] = useState()
	const [isImageModalOpen, setIsImageModalOpen] = useState({
		isOpen: false,
		img: '',
	})
	const [isNewObjectModalOpen, setIsNewObjectModalOpen] = useState(false)
	const [isRemoveObjectModalOpen, setIsRemoveObjectModalOpen] = useState(false)
	const [isModalSessionOpen, setIsModalSessionOpen] = useState(false)
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
	const [urlData, setUrlData] = useState({
		user: '',
		mapId: '',
	})
	const [isEditable, setIsEditable] = useState({
		allowed: false,
		token: '',
	})

	const { error, sendRequest } = useHttp()
	const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
	const context = useContext(Context)

	useEffect(() => {
		if (history.action === 'REPLACE') {
			setIsEditable({
				allowed: true,
				token: history.location.state.secretToken,
			})
		}

		const link = window.location.href

		const splittedUrl = link.split('/')
		const user = splittedUrl[splittedUrl.length - 2]
		const mapId = splittedUrl[splittedUrl.length - 1]
		setUrlData({
			user: user,
			mapId: mapId,
		})
	}, [])

	useEffect(() => {
		if (!urlData.mapId) return
		sendRequest({
			url: `${BaseUrl}/maps/${urlData.user}/${urlData.mapId}`,
		}).then(res => {
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

				if (localStorage.getItem('token') && localStorage.getItem('user')) {
					setIsEditable({
						allowed: true,
						token: localStorage.getItem('token'),
					})
				}
			} else {
				dispatchMatcher(dispatchAppData, timelineReducerActions.FETCH_ERROR)
			}
		})
	}, [sendRequest, dispatchAppData, urlData.mapId])

	useEffect(() => {
		if (
			appData &&
			mapInstance &&
			appData.spatialData.data.map.features.length > 0
		) {
			zoomToBBox()
		}
	}, [mapInstance])

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

	useEffect(() => {
		if (error.content === 'Not authorized') {
			// setIsModalSessionOpen(true)
		}
	}, [error])

	useEffect(() => {
		if (!authContext.isLoggedIn && isEditable.allowed) {
			setIsModalSessionOpen(true)
		}
	}, [authContext.isLoggedIn])

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
		const {
			title,
			description,
			photo1,
			photo2,
			photo3,
			video,
			audio,
			date,
			address,
		} = props
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
				date,
				address,
			},
		}

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

	const onPostHandler = useCallback(async () => {
		if (!appData.spatialData.data) return
		const mapPreview = {
			places: appData.spatialData.data?.map.features.length,
			title: appData.spatialData.data?.info.title,
			description: appData.spatialData.data?.info.description,
			basemap: appData.spatialData.data?.style.basemap,
		}
		try {
			sendRequest({
				method: 'PATCH',
				url: `${BaseUrl}/maps/${urlData.user}/${urlData.mapId}`,
				body: appData.spatialData,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + authContext.token,
				},
			}).then(res => res)

			sendRequest({
				method: 'PATCH',
				url: `${BaseUrl}/mapsInfo/${urlData.mapId}`,
				body: mapPreview,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + authContext.token,
				},
			}).then(res => res)
		} catch {
			alert('Something went wrong')
		}
	}, [appData.spatialData, authContext.token, urlData, sendRequest])

	useEffect(() => {
		onPostHandler()
	}, [appData, onPostHandler])

	const onModalSessionClose = () => {
		setIsModalSessionOpen(false)
		history.replace('/story-account/')
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
				center: [
					visiblePlace.geometry?.coordinates[0],
					visiblePlace.geometry?.coordinates[1],
				],
				zoom: 16,
			})
		} else {
			mapInstance.flyTo({
				center: [
					visiblePlace[0].geometry?.coordinates[0],
					visiblePlace[0].geometry?.coordinates[1],
				],
				zoom: 16,
			})
		}
	}

	const onScrollHandler = () => {
		let visiblePlaces = []
		appData.spatialData.data.map.features.map(place => {
			let id = place.properties.id

			const invisibleElement = document.getElementById(id)
			invisibleElement.classList.remove('show')
			if (isElementOnScreen(id)) {
				visiblePlaces.push(place)
				setVisiblePlace(visiblePlaces)
				if (!selectedPlace) {
					const visibleElement = document.getElementById(
						visiblePlace[0]?.properties.id
					)
					visibleElement?.classList.add('show')
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
						const visibleElement = document.getElementById(
							visiblePlace[0]?.properties.id
						)
						console.log(visibleElement)
						visibleElement?.classList.add('show')
					}
				}
			} else if (!isElementOnScreen(id)) {
				const invisibleElement = document.getElementById(id)
				invisibleElement.classList.remove('show')
			}
			return null
		})
	}

	const onObjectClickHandler = object => {
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

	const onZoomInHandler = () => {
		mapInstance.flyTo({
			center: mapInstance.center,
			zoom: mapInstance.zoom + 1.5,
		})
	}

	const onZoomOutHandler = () => {
		mapInstance.flyTo({
			center: mapInstance.center,
			zoom: mapInstance.zoom - 1.5,
		})
	}

	const zoomToBBox = useCallback(() => {
		let coords = []

		appData.spatialData.data?.map.features.map(el => {
			coords.push(el.geometry.coordinates)
		})

		mapInstance.fitToBounds(
			[
				[getBoundingBox(coords).xMax, getBoundingBox(coords).yMax],
				[getBoundingBox(coords).xMin, getBoundingBox(coords).yMin],
			],
			{ padding: 60, maxZoom: 19 }
		)
	}, [appData.spatialData.data?.map.features, mapInstance])

	const onDescriptionOpenHandler = () => {
		setIsDescriptionOpen(!isDescriptionOpen)
	}

	const onReturnHandler = () => {
		history.replace(`/story-account/maps/${urlData.user}`)
	}

	return (
		<StyledWrapper className='apply-font'>
			{appData.isLoading && <Spinner />}
			{error.content && error.content !== 'Not authorized' && (
				<FetchDataError />
			)}
			{newObject.addNewObject && <AddPlaceInfo />}
			<Toolbox loggedIn={authContext.isLoggedIn}>
				{!isMobile && isEditable.allowed && (
					<StyledIconButton onClick={onReturnHandler}>
						<ArrowBackIcon />
					</StyledIconButton>
				)}
				{appData.spatialData.data?.info.description && (
					<StyledIconButton onClick={onDescriptionOpenHandler}>
						<InfoIcon />
					</StyledIconButton>
				)}
				{!isMobile && isEditable.allowed && !history.location.state.preview && (
					<StyledIconButton onClick={context.onLanguageChange}>
						<TranslateIcon />
					</StyledIconButton>
				)}
				<StyledIconButton onClick={onZoomInHandler}>
					<ZoomInIcon />
				</StyledIconButton>
				<StyledIconButton onClick={onZoomOutHandler}>
					<ZoomOutIcon />
				</StyledIconButton>
				<StyledIconButton onClick={zoomToBBox}>
					<ZoomOutMapIcon />
				</StyledIconButton>
			</Toolbox>
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
										isDescriptionOpen={isDescriptionOpen}
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
							{!isMobile &&
								isEditable.allowed &&
								isEditable.token &&
								!history.location.state.preview && (
									<StyledEditorPanel
										order={
											appData.spatialData.data.style.panelsOrder.editorPanel
										}
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
							mapInstance={mapInstance}
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
							content={translate(
								'modal.removeObject',
								'Are you sure you want to remove this object?'
							)}
						/>
					</CustomModal>
					<CustomModal
						onModalClose={onModalClose}
						modalIsOpen={isRemoveIconModalOpen}>
						<RemoveObjectConfirmation
							confirmationHandler={onRemoveIconHandler}
							content={translate(
								'modal.removeIcon',
								'Are you sure you want to remove this icon?'
							)}
						/>
					</CustomModal>
					<CustomModal
						onModalClose={onModalSessionClose}
						modalIsOpen={isModalSessionOpen}>
						<StyledModalContent>
							<p>
								{translate(
									'modal.session',
									'Your session has expired. Please log in.'
								)}
							</p>
							<StyledCloseButton
								text='OK'
								size='small'
								variant='contained'
								onClick={onModalSessionClose}
							/>
						</StyledModalContent>
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
		order: ${props => props.order || -1};
		background: ${props => props.color || '#fff'};
	}
`

const StyledEditorPanel = styled.div`
	&& {
		width: 400px;
		order: ${props => props.order || 1};
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
		height: 100%;
	}
`
const StyledIconButton = styled(IconButton)`
	&& {
		z-index: 2;
		color: #fff;
		padding: 5px;
		${({ theme }) => `{
		background: ${theme.palette.info.main};

		&:hover {
			background: ${theme.palette.info.light};
		}
	}`}
	}
`
const StyledModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;

	& > p {
		margin-bottom: 20px;
		font-weight: bold;
	}
`

const StyledCloseButton = styled(CustomButton)`
	&& {
		margin-top: 20px;
		width: 1000px;
		display: none;
	}
`
