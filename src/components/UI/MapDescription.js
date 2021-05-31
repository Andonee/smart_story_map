import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import InfoIcon from '@material-ui/icons/Info'

const MapDescription = ({ description }) => {
	const [open, setOpen] = useState(false)

	const toggleOpen = () => {
		setOpen(!open)
	}
	return (
		<StyledWrapper>
			<StyledButton onClick={toggleOpen}>
				<InfoIcon />
			</StyledButton>

			<StyledDescription opened={open}>
				<StyledContent>{description}</StyledContent>
			</StyledDescription>
		</StyledWrapper>
	)
}

export default MapDescription

const StyledWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 0px;
	top: 20px;
	z-index: 2;
`

const StyledButton = styled.button`
	${({ theme }) => `
  display: flex;
  align-items: center;
  background: ${theme.palette.info.main};
  color: #fff;
  border: none;
  margin-bottom: auto;
  margin-right: 5px;
  margin-left: 5px;
  padding: 5px 10px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  transition: all 0.3s;

&:hover {
  background: ${theme.palette.info.light};
  cursor: pointer;
}

`}
`

const StyledDescription = styled.div`
	display: flex;
	justify-content: center;
	order: -1;
	width: 300px;
	max-width: 85%;
	${
		'' /* height: auto;
	max-height: 50%; */
	}
	background: #ffffffb0;
	z-index: 2;
	letter-spacing: 1px;
	color: #545454;
	font-size: 14px;
	line-height: 20px;
	opacity: 0;
	${props =>
		props.opened &&
		css`
			opacity: 1;
		`}
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
	transition: all 0.3s;
`
const StyledContent = styled.div`
    height: 400px;
    max-height: 80%;
    overflow: scroll;
    overflow-x:hidden;
    padding: 10px 20px;
    width: 100%;
}`
