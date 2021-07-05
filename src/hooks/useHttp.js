import { useState, useCallback } from 'react'
import axios from 'axios'

const useFetch = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState({
		content: '',
		isError: false,
	})

	const sendRequest = useCallback(async ({ url, method, body, headers }) => {
		setLoading(true)
		try {
			const request = await axios({
				url: url,
				method: method ? method : 'GET',
				data: body ? body : {},
				headers: headers,
			})

			const response = await request

			return response
		} catch (error) {
			console.log(error)
			console.log(error.response)
			if (error.response.status === 401) {
				setError({
					content: 'Not authorized',
					isError: true,
				})
			} else {
				setError({
					content: '',
					isError: true,
				})
			}
		}
		setLoading(false)
	}, [])

	return { loading, error, sendRequest }
}

export default useFetch
