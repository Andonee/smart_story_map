import styled from 'styled-components'

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
	top: 40px;
	right: ${props => (props.loggedIn ? '410px' : '20px')};
	z-index: 10;

	& > button {
		margin: 5px 0;
	}
`
