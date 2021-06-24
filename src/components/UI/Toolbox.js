import styled from 'styled-components'

const Toolbox = ({ children }) => {
	return <StyledToolboxWrapper>{children}</StyledToolboxWrapper>
}

export default Toolbox

const StyledToolboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 40px;
	right: 360px;
	z-index: 10;

	& > button {
		margin: 5px 0;
	}
`
