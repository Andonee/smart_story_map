import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
	createMuiTheme,
	ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#545454',
		},
		secondary: {
			main: '#gssesg',
		},
		info: {
			main: '#2D8DE8',
			light: '#3f97ea',
		},
	},
})

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
