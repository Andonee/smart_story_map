const dispatchMatcher = (dispatch, type, value) => {
	dispatch({ type: type, payload: value })
}

export default dispatchMatcher
