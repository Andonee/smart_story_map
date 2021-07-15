import { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Auth from './pages/Auth'
import Account from './pages/Account'
import StoryMap from './pages/StoryMap'
import './App.css'
import AuthContext from './store/auth-context'

function App() {
	const authContext = useContext(AuthContext)
	return (
		<div className='App'>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Switch>
					<Route path='/smart-story-map/' exact>
						<Auth />
					</Route>
					{authContext.isLoggedIn && (
						<Route path='/smart-story-map/maps/:user'>
							<Account />
						</Route>
					)}
					<Route path='/map/:user/:id'>
						<StoryMap />
					</Route>
					<Route path='/smart-story-map/*'>
						<Redirect to='/smart-story-map/' />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
