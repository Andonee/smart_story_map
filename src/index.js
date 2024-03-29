import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
	createMuiTheme,
	ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components/macro'

import LanguageWrapper from './components/UI/LanguageWrapper'
import { AuthContextProvider } from './store/auth-context'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#878787',
		},
		secondary: {
			main: '#gssesg',
		},
		info: {
			main: '#2D8DE8',
			light: '#3f97ea',
		},
	},

	overrides: {
		MuiOutlinedInput: {
			root: {
				'& $notchedOutline': {
					borderColor: '#gssesg',
					transition: 'all .3s',
				},
				'&:hover $notchedOutline': {
					borderColor: '#2D8DE8',
				},
				'&$focused $notchedOutline': {
					borderColor: '#2D8DE8',
				},
			},
		},
		MuiFormLabel: {
			root: {
				color: '#545454',
				'&$focused': {
					color: '#2D8DE8',
				},
			},
		},
		MuiButton: {
			root: {
				background: 'red',
			},
		},
	},
})

ReactDOM.render(
	<React.StrictMode>
		<LanguageWrapper>
			<MuiThemeProvider theme={theme}>
				<ThemeProvider theme={theme}>
					<AuthContextProvider>
						<App />
					</AuthContextProvider>
				</ThemeProvider>
			</MuiThemeProvider>
		</LanguageWrapper>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
