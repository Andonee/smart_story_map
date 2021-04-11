import { useState, useEffect } from 'react'

import axios from 'axios'

import './App.css'
import Grid from '@material-ui/core/Grid'
import InfoPanel from './components/InfoPanel/InfoPanel'
import EditorPanel from './components/EditorPanel/EditorPanel'
import Map from './components/Map/Map'
import ImageModal from './components/UI/ImageModal'

function App() {
	const [spatialData, setSpatialData] = useState()
	const [isImageModalOpen, setIsImageModalOpen] = useState({
		isOpen: false,
		img: '',
	})
	const [mapIcon, setMapIcon] = useState()
	const [IconSize, setIconSize] = useState()
	const [Basemap, setBasemap] = useState()
	const [mapInstance, setMapInstance] = useState()

	useEffect(() => {
		axios.get('http://localhost:5000/maps/1').then(res => {
			console.log(res.data)
			setSpatialData(res.data)
			setMapIcon(res.data.data.info.icons.icon)
			setIconSize(res.data.data.info.icons.size)
			setBasemap(res.data.data.info.basemap)
		})
	}, [])

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
	return (
		<div className='App'>
			<Grid container className='grid_container'>
				<Grid item xs={3} xl={2}>
					<div className='grid_element'>
						{spatialData && (
							<InfoPanel
								spatialData={spatialData}
								imageOpenHandler={imageOpenHandler}
							/>
						)}
					</div>
				</Grid>
				<Grid item xs className='grid_element'>
					<div className='grid_element'>
						{spatialData && Basemap && (
							<Map
								spatialData={spatialData.data.map}
								mapIcon={mapIcon}
								setMapInstance={setMapInstance}
								IconSize={IconSize}
								Basemap={Basemap}
							/>
						)}
					</div>
				</Grid>
				<Grid item xs={4} xl={3} className='grid_element'>
					<div className='grid_element grid_editor_panel'>
						{spatialData && (
							<EditorPanel
								data={spatialData.data.info}
								onIconChange={onIconChange}
								onIconSizeChange={onIconSizeChange}
								IconSize={IconSize}
								onBasemapChange={onBasemapChange}
							/>
						)}
					</div>
				</Grid>
			</Grid>
			<ImageModal isOpen={isImageModalOpen} setIsOpen={setIsImageModalOpen} />
		</div>
	)
}

export default App
