import { useState, useEffect } from 'react'

import './App.css'
import Grid from '@material-ui/core/Grid'
import InfoPanel from './components/InfoPanel/InfoPanel'
import EditorPanel from './components/EditorPanel/EditorPanel'
import Map from './components/Map/Map'

import { objects } from './data/places'

function App() {
	const [spatialData, setSpatialData] = useState()

	useEffect(() => {
		console.log(objects[0])
		setSpatialData(objects[0])
	}, [])
	return (
		<div className='App'>
			<Grid container className='grid_container'>
				<Grid item xs={4} xl={3}>
					<div className='grid_element'>
						{spatialData && <InfoPanel spatialData={spatialData} />}
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
		</div>
	)
}

export default App
