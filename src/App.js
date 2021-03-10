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

	useEffect(() => {
		axios
			.get('http://localhost:5000/objects/1')
			.then((res) => setSpatialData(res.data))
	}, [])

	const imageOpenHandler = (e) => {
		const image = e.target.src
		setIsImageModalOpen({
			isOpen: true,
			img: image,
		})
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
						<Map spatialData={spatialData} />
					</div>
				</Grid>
				<Grid item xs={4} xl={3} className='grid_element'>
					<div className='grid_element'>
						<EditorPanel />
					</div>
				</Grid>
			</Grid>
			<ImageModal isOpen={isImageModalOpen} setIsOpen={setIsImageModalOpen} />
		</div>
	)
}

export default App
