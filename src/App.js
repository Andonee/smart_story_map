import { useState, useEffect } from 'react'

import { nanoid } from 'nanoid'
import styled from 'styled-components'
import produce from 'immer'

import InfoPanel from './components/InfoPanel/InfoPanel'
import EditorPanel from './components/EditorPanel/EditorPanel'
import Map from './components/Map/Map'
import ImageModal from './components/UI/ImageModal'
import CostumModal from './components/UI/CostumModal'
import NewPlace from './components/EditorPanel/NewPlace/NewPlace'
import RemoveObjectConfirmation from './components/EditorPanel/RemoveObjectConfirmation/RemoveObjectConfirmation'
import useHttp from './hooks/useHttp'

function App() {
	const [spatialData, setSpatialData] = useState()
	const [mapInstance, setMapInstance] = useState()
	const [isImageModalOpen, setIsImageModalOpen] = useState({
		isOpen: false,
		img: '',
	})
	const [mapIcon, setMapIcon] = useState()
	const [IconSize, setIconSize] = useState()
	const [Basemap, setBasemap] = useState()
	const [panelsOrder, setPanelsOrder] = useState({
		infoPanel: -1,
		editorPanel: 1,
	})
	const [backgroundColor, setBackgroundColor] = useState('#fff')
	const [timelineColor, setTimelineColor] = useState('rgb(33, 150, 243)')
	const [fontColor, setFontColor] = useState('#545454')
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

	const { error, loading, sendRequest } = useHttp()

	useEffect(() => {
		sendRequest({ url: 'http://localhost:5000/maps/2' }).then(res => {
			setSpatialData(res.data)
			setMapIcon(res.data.data.info.icons.icon)
			setIconSize(res.data.data.info.icons.size)
			setBasemap(res.data.data.info.basemap)
		})
	}, [sendRequest])

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

	const onIconChange = icon => {
		mapInstance.layer('places').remove()
		setMapIcon(icon)
	}

	const onIconSizeChange = size => {
		mapInstance.layer('places').remove()
		setIconSize(size)
	}

	const onBasemapChange = basemap => {
		setBasemap(basemap)
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
		const { title, description, photo1, photo2, photo3, video, audio } = props
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
		console.log(createNewObject)
		setIsNewObjectModalOpen(false)
		setSpatialData(
			produce(spatialData, draft => {
				draft.data.map.features = [...draft.data.map.features, createNewObject]
			})
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
		setSpatialData(
			produce(spatialData, draft => {
				draft.data.map.features[editedPlace.idx].properties = props
			})
		)
		setIsNewObjectModalOpen(false)
	}

	const onPanelsOrderChange = () => {
		if (panelsOrder.infoPanel === -1 && panelsOrder.editorPanel === 1) {
			setPanelsOrder({
				infoPanel: 1,
				editorPanel: -1,
			})
		} else {
			setPanelsOrder({
				infoPanel: -1,
				editorPanel: 1,
			})
		}
	}

	const onPlacesOrderChange = order => {
		setSpatialData(
			produce(spatialData, draft => {
				draft.data.map.features = order
			})
		)
	}

	const onPostHandler = async () => {
		try {
			sendRequest({
				method: 'PATCH',
				url: `http://localhost:5000/maps/2`,
				body: spatialData,
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
			setSpatialData(
				produce(spatialData, draft => {
					draft.data.map.features.splice(editedPlace.idx, 1)
				})
			)
		}
	}

	const onPlaceEdit = (place, action) => {
		const idx = spatialData.data.map.features.findIndex(
			el => el.properties.id === place.id
		)
		setEditedPlace({
			idx: idx,
			data: spatialData.data.map.features[idx].properties,
			action: action,
		})
	}

	return (
		<StyledWrapper>
			<StyledInfoPanel
				order={panelsOrder.infoPanel}
				color={backgroundColor}
				type={spatialData?.type}
			>
				{spatialData && (
					<InfoPanel
						spatialData={spatialData}
						imageOpenHandler={imageOpenHandler}
						fontColor={fontColor}
						timelineColor={timelineColor}
					/>
				)}
			</StyledInfoPanel>

			<StyledMap>
				{spatialData && Basemap && (
					<Map
						spatialData={spatialData.data.map}
						mapIcon={mapIcon}
						setMapInstance={setMapInstance}
						IconSize={IconSize}
						Basemap={Basemap}
						onAddNewObject={onAddNewObject}
						newObject={newObject}
					/>
				)}
			</StyledMap>

			<StyledEditorPanel
				order={panelsOrder.editorPanel}
				color={backgroundColor}
			>
				{spatialData && (
					<EditorPanel
						data={spatialData.data}
						onIconChange={onIconChange}
						onIconSizeChange={onIconSizeChange}
						IconSize={IconSize}
						onBasemapChange={onBasemapChange}
						onPanelsOrderChange={onPanelsOrderChange}
						backgroundColor={backgroundColor}
						setBackgroundColor={setBackgroundColor}
						fontColor={fontColor}
						setFontColor={setFontColor}
						onPlacesOrderChange={onPlacesOrderChange}
						setNewObject={setNewObject}
						newObject={newObject}
						onPostHandler={onPostHandler}
						onPlaceEdit={onPlaceEdit}
						setTimelineColor={setTimelineColor}
						spatialData={spatialData}
						timelineColor={timelineColor}
					/>
				)}
			</StyledEditorPanel>

			<ImageModal isOpen={isImageModalOpen} setIsOpen={setIsImageModalOpen} />
			<CostumModal
				onModalClose={onModalClose}
				modalIsOpen={isNewObjectModalOpen}
			>
				<NewPlace
					onCreateNewObject={onCreateNewObject}
					editedPlace={editedPlace.data}
					onUpdateObject={onUpdateObject}
				/>
			</CostumModal>
			<CostumModal
				onModalClose={onModalClose}
				modalIsOpen={isRemoveObjectModalOpen}
			>
				<RemoveObjectConfirmation
					onRemoveObjectHandler={onRemoveObjectHandler}
				/>
			</CostumModal>
		</StyledWrapper>
	)
}

export default App

const StyledInfoPanel = styled.div`
	&& {
		width: ${props => (props.type === 'timeline' ? '500px' : '350px')};
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
