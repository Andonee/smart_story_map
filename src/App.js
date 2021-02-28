import { useState } from 'react'

import './App.css'
import Grid from '@material-ui/core/Grid'
import InfoPanel from './components/InfoPanel/InfoPanel'
import EditorPanel from './components/EditorPanel/EditorPanel'
import Map from './components/Map/Map'

function App() {
	return (
		<div className='App'>
			<Grid container className='grid_container'>
				<Grid item xs={3} xl={2}>
					<div className='grid_element'>
						<InfoPanel />
					</div>
				</Grid>
				<Grid item xs className='grid_element'>
					<div className='grid_element'>
						<Map />
					</div>
				</Grid>
				<Grid item xs={3} xl={2} className='grid_element'>
					<div className='grid_element'>
						<EditorPanel />
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default App
