import { useState, useCallback } from 'react'
import axios from 'axios'

const useFetch = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const sendRequest = useCallback(async ({ url, method, body }) => {
		setLoading(true)
		try {
			const request = await axios({
				url: url,
				method: method ? method : 'GET',
				data: body ? body : {},
				headers: {
					'Content-type': 'application/json',
				},
			})

			const response = await request

			return response
		} catch (error) {
			setError(true)
		}
		setLoading(false)
	}, [])

	return { loading, error, sendRequest }
}

export default useFetch
