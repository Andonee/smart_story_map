import styled from 'styled-components/macro'
import { isMobile } from 'react-device-detect'
import { useHistory } from 'react-router-dom'

const Toolbox = ({ children, loggedIn }) => {
	const history = useHistory()
	return (
		<StyledToolboxWrapper
			loggedIn={loggedIn}
			preview={history.location.state?.preview}>
			{children}
		</StyledToolboxWrapper>
	)
}

export default Toolbox

const StyledToolboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: ${isMobile ? '100px' : '40px'};
	right: ${props =>
		props.loggedIn && !props.preview ? '410px' : isMobile ? '20px' : '20px'};
	z-index: 10;

	& > button {
		margin: 5px 0;
	}
`
