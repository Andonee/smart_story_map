import React from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import styled from 'styled-components'

const Link = ({ link, fontColor }) => {
	return (
		<StyledWrapper>
			<StyledArrow color={fontColor}>
				<ArrowRightAltIcon />
			</StyledArrow>
			<StyledHyperlink
				href={link}
				target='_blank'
				rel='noreferrer'
				title={link}
				color={fontColor}
			>
				{link}
			</StyledHyperlink>
		</StyledWrapper>
	)
}

export default Link

const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 20px 20px;
`
const StyledArrow = styled.div`
	width: 24px;
	color: ${props => props.color};
`
const StyledHyperlink = styled.a`
	color: ${props => props.color};
	text-decoration: none;
	margin-left: 10px;
	transition-duration: 0.3s;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&:hover {
		color: #d3d3d3;
	}
`
