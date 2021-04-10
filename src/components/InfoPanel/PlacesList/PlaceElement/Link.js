import React from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import styled from 'styled-components'

const Link = ({ link }) => {
	return (
		<StyledWrapper>
			<StyledArrow>
				<ArrowRightAltIcon color='primary' />
			</StyledArrow>
			<StyledHyperlink href={link} target='_blank' rel='noreferrer' title={link}>
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
`
const StyledHyperlink = styled.a`
	${({ theme }) => `
		color: ${theme.palette.primary.main};
		textDecoration: none;
		margin-left: 10px;
		transition-duration: .3s;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&:hover {
			color: #D3D3D3,
		},
		`}
`
