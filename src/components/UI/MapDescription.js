import styled, { css } from 'styled-components'
import { isMobile } from 'react-device-detect'

const MapDescription = ({ description, isDescriptionOpen }) => {
	return (
		<StyledWrapper opened={isDescriptionOpen}>
			<StyledDescription opened={isDescriptionOpen}>
				<StyledContent>{description}</StyledContent>
			</StyledDescription>
		</StyledWrapper>
	)
}

export default MapDescription

const StyledWrapper = styled.div`
	display: none;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: ${isMobile ? '35px' : '60px'};
	top: ${isMobile ? '100px' : '20px'};
	z-index: 2;
	text-align: justify;
	${'' /* overflow: scroll; */}

	${props =>
		props.opened &&
		css`
			display: flex;
		`}
`

const StyledDescription = styled.div`
	display: flex;
	justify-content: center;
	order: -1;
	width: 350px;
	max-width: 85%;
	${
		'' /* height: auto;
	max-height: 50%; */
	}
	background: #ffffffb0;
	z-index: -1;
	letter-spacing: 1px;
	color: #545454;
	font-size: 14px;
	line-height: 20px;
	opacity: 0;
	border-radius: 10px;
	${props =>
		props.opened &&
		css`
			opacity: 1;
		`}
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
	transition: all 0.3s;
`
const StyledContent = styled.div`
    height: ${isMobile ? '350px' : '400px'};
    max-height: 80%;
    ${'' /* overflow: scroll; */}
    overflow-x:hidden;
    padding: 10px 10px;
    width: 100%;
}`
