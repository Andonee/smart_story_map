import React from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import styled from 'styled-components'

const Link = ({ link }) => {
	return (
		<Wrapper>
			<Arrow>
				<ArrowRightAltIcon color='primary' />
			</Arrow>
			<Hyperlink href={link} target='_blank' rel='noreferrer' title={link}>
				{link}
			</Hyperlink>
		</Wrapper>
	)
}

export default Link

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 20px 20px;
`
const Arrow = styled.div`
	width: 24px;
`
const Hyperlink = styled.a`
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
