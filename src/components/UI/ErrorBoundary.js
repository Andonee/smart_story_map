import React, { Component } from 'react'
import styled from 'styled-components'
import translate from '../../utils/translate'

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		console.log('error', error, 'info', info)
	}
	render() {
		if (this.state.hasError) {
			return (
				<StyledError>
					{translate('ui.errorBoundary', 'Something went wrong :(')}
				</StyledError>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary

const StyledError = styled.div`
	${({ theme }) => `
  display: flex;
  justify-content: center;
  color: ${theme.palette.info.main}`};
	font-weight: bold;
`
