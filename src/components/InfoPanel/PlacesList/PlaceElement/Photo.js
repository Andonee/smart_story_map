import React from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility'
import styled from 'styled-components'

const Photo = ({ photo, open }) => {
	return (
		<Wrapper>
			<Icon />
			<Img src={photo} onClick={open} />
		</Wrapper>
	)
}

export default Photo

const Wrapper = styled.div`
	position: relative;
`
const Img = styled.img`
	width: 100%;
	margin-bottom: 10px;

	&:hover {
		cursor: pointer;
		background: transparentize;
	}
`
const Icon = styled(VisibilityIcon)`
	position: absolute;
	color: #fff;
	top: 5px;
	left: 5px;
`
