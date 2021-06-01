import { useState, useEffect } from 'react'

import { nanoid } from 'nanoid'
import styled from 'styled-components'
import produce from 'immer'
import { useImmerReducer } from 'use-immer'

import InfoPanel from './components/InfoPanel/InfoPanel'
import EditorPanel from './components/EditorPanel/EditorPanel'
import Map from './components/Map/Map'
import ImageModal from './components/UI/ImageModal'
import CustomModal from './components/UI/CustomModal'
import NewPlace from './components/EditorPanel/NewPlace/NewPlace'
import Spinner from './components/UI/Spinner'
import FetchDataError from './components/UI/FetchDataError'
import MapTitle from './components/UI/MapTitle'
import MapDescription from './components/UI/MapDescription'

import RemoveObjectConfirmation from './components/EditorPanel/RemoveObjectConfirmation/RemoveObjectConfirmation'
import useHttp from './hooks/useHttp'
import timelineReducer, {
	timelineInitialState,
	timelineReducerActions,
} from './store/timelineReducer'
import dispatchMatcher from './utils/dispatchMatcher'

function App() {
	const [mapInstance, setMapInstance] = useState()
	const [isImageModalOpen, setIsImageModalOpen] = useState({
		isOpen: false,
		img: '',
	})
	const [isNewObjectModalOpen, setIsNewObjectModalOpen] = useState(false)
	const [isRemoveObjectModalOpen, setIsRemoveObjectModalOpen] = useState(false)
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

	const { error, sendRequest } = useHttp()

	useEffect(() => {
		sendRequest({ url: 'http://localhost:5001/maps/2' }).then(res => {
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
			console.log('REMOVE')
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

	return (
		<StyledWrapper className='apply-font'>
			{appData.isLoading && <Spinner />}
			{error && <FetchDataError />}
			{!appData.isLoading && (
				<>
					<StyledInfoPanel
						order={appData.spatialData.data?.style.panelsOrder.infoPanel}
						color={appData.spatialData.data?.style.backgroundColor}
						type={appData.spatialData.type}>
						{appData.spatialData.data && (
							<InfoPanel
								spatialData={appData.spatialData}
								imageOpenHandler={imageOpenHandler}
							/>
						)}
					</StyledInfoPanel>
					<StyledMap>
						{appData.spatialData.data?.map.features &&
							appData.spatialData.data?.info.basemap && (
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
									/>
								</>
							)}
					</StyledMap>
					{appData.spatialData.data && (
						<>
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
								/>
							</StyledEditorPanel>
						</>
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
							onRemoveObjectHandler={onRemoveObjectHandler}
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
