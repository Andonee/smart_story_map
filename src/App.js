import { useState, useEffect } from 'react'

import { nanoid } from 'nanoid'
import axios from 'axios'
import styled from 'styled-components'
import produce from 'immer'

import InfoPanel from './components/InfoPanel/InfoPanel'
import EditorPanel from './components/EditorPanel/EditorPanel'
import Map from './components/Map/Map'
import ImageModal from './components/UI/ImageModal'
import CostumModal from './components/UI/CostumModal'
import NewPlace from './components/EditorPanel/NewPlace/NewPlace'

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
	const [fontColor, setFontColor] = useState('#545454')
	const [isNewObjectModalOpen, setIsNewObjectModalOpen] = useState(false)
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

	useEffect(() => {
		axios
			.get('http://localhost:5000/maps/1')
			.then(res => {
				console.log(res)
				console.log(res.data)
				setSpatialData(res.data)
				setMapIcon(res.data.data.info.icons.icon)
				setIconSize(res.data.data.info.icons.size)
				setBasemap(res.data.data.info.basemap)
			})
			.catch(err => {
				alert('Something went wrong')
			})
	}, [])

	useEffect(() => {
		if (newObject.id && newObject.coordinates.length === 2) {
			setIsNewObjectModalOpen(true)
		}
	}, [newObject])

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
		const { id, coordinates } = newObject
		const createNewObject = {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates,
			},
			properties: {
				id,
				...props,
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
			const res = await axios({
				method: 'PATCH',
				url: `http://localhost:5000/maps/1`,
				data: spatialData,
			})

			return res
		} catch {
			alert('Something went wrong')
		}
	}

	const onModalClose = () => {
		setIsNewObjectModalOpen(false)
		setNewObject(
			produce(spatialData, draft => {
				draft.addNewObject = false
				draft.id = ''
				draft.coordinates = []
			})
		)
	}

	return (
		<StyledWrapper>
			<StyledInfoPanel order={panelsOrder.infoPanel} color={backgroundColor}>
				{spatialData && (
					<InfoPanel
						spatialData={spatialData}
						imageOpenHandler={imageOpenHandler}
						fontColor={fontColor}
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
					/>
				)}
			</StyledEditorPanel>

			<ImageModal isOpen={isImageModalOpen} setIsOpen={setIsImageModalOpen} />
			<CostumModal
				onModalClose={onModalClose}
				modalIsOpen={isNewObjectModalOpen}
			>
				<NewPlace onCreateNewObject={onCreateNewObject} />
			</CostumModal>
		</StyledWrapper>
	)
}

export default App

const StyledInfoPanel = styled.div`
	&& {
		width: 350px;
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
