export const httpRequest = async (url, method = 'GET', headers, body) => {
	const request = await fetch(url, {
		method: method,
		headers: headers,
		body: body ? JSON.stringify(body) : undefined,
	})

	return request
}
