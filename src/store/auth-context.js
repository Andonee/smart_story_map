import { createContext, useState, useEffect, useCallback } from 'react'

let logoutTimer

const AuthContext = createContext({
	token: '',
	isLoggedIn: false,
	login: token => {},
	logout: () => {},
	user: '',
})

const calculateRemainingTime = expirationTime => {
	// debugger
	const currentTime = new Date().getTime()
	console.log('currentTime', currentTime)
	// const adjExpirationtime = new Date(expirationTime).getTime()
	const adjExpirationtime = expirationTime

	// console.log(expirationTime.getTime())

	const remainingTime = adjExpirationtime - currentTime

	return remainingTime
}

const retriveStoredToken = () => {
	const storedToken = localStorage.getItem('token')
	const storedExpirationTime = localStorage.getItem('expirationTime')
	const storedUser = localStorage.getItem('user')

	const remainingTime = calculateRemainingTime(storedExpirationTime)

	if (remainingTime <= 3600) {
		localStorage.removeItem('token')
		localStorage.removeItem('expirationTime')
		localStorage.removeItem('user')
		return null
	}

	return {
		token: storedToken,
		duration: remainingTime,
		user: storedUser,
	}
}

export const AuthContextProvider = ({ children }) => {
	const tokenData = retriveStoredToken()
	let initialToken
	let initialUser
	if (tokenData) {
		initialToken = tokenData.token
		initialUser = tokenData.user
	}
	const [token, setToken] = useState(initialToken)
	const [user, setUser] = useState(initialUser)

	const userIsLoggedin = !!token

	const logoutHandler = useCallback(() => {
		setToken(null)
		localStorage.removeItem('token')
		localStorage.removeItem('expirationTime')
		localStorage.removeItem('user')

		if (logoutTimer) {
			clearTimeout(logoutTimer)
		}
	}, [])

	const loginHandler = (token, expirationTime) => {
		setToken(token)
		localStorage.setItem('token', token)
		localStorage.setItem('expirationTime', expirationTime)

		const remainingTime = calculateRemainingTime(expirationTime)

		console.log('remaining', remainingTime)

		logoutTimer = setTimeout(logoutHandler, remainingTime)
	}

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration)
		}
	}, [tokenData, logoutHandler])

	const getUser = userName => {
		setUser(userName)
		return user
	}

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedin,
		login: loginHandler,
		logout: logoutHandler,
		user: getUser,
		userName: user,
	}

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	)
}

export default AuthContext
