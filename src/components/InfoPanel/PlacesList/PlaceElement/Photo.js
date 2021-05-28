import React from 'react'
// import VisibilityIcon from '@material-ui/icons/Visibility'
import styled from 'styled-components'

const Photo = ({ photo, open }) => {
	return (
		<StyledWrapper>
			{/* <StyledIcon /> */}
			<StyledImg src={photo} onClick={open} />
		</StyledWrapper>
	)
}

export default Photo

const StyledWrapper = styled.div`
	position: relative;
`
const StyledImg = styled.img`
	width: 100%;
	margin-bottom: 10px;

	&:hover {
		cursor: pointer;
		background: transparentize;
	}
`
// const StyledIcon = styled(VisibilityIcon)`
// 	position: absolute;
// 	color: #fff;
// 	top: 5px;
// 	left: 5px;
// `
