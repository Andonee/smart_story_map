import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

const Toolbox = ({ children, loggedIn }) => {
	return (
		<StyledToolboxWrapper loggedIn={loggedIn}>{children}</StyledToolboxWrapper>
	)
}

export default Toolbox

const StyledToolboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: ${isMobile ? '100px' : '40px'};
	right: ${props => (props.loggedIn ? '410px' : isMobile ? '20px' : '20px')};
	z-index: 10;

	& > button {
		margin: 5px 0;
	}
`
