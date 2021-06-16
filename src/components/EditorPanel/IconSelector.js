import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import dispatchMatcher from '../../utils/dispatchMatcher'
import { encode } from 'js-base64'

const IconSelector = ({
	icons,
	onChange,
	action,
	dispatchAppData,
	setIsRemoveIconModalOpen,
}) => {
	const [tooLargeIcon, setTooLargeIcon] = useState(false)
	const [selectedIcon, setSelectedIcon] = useState(icons.selectedIcon.id)
	const [defaultIconsRemoveInfo, setDefaultIconsRemoveInfo] = useState(false)
	const svg_uploader = useRef()

	const onIconSelectHandler = e => {
		if (e.target.id !== selectedIcon) {
			onChange(e.target, action.SET_ICON)
			setSelectedIcon(e.target.id)
			setDefaultIconsRemoveInfo(false)
			setTooLargeIcon(false)
		}
	}

	const onRemoveIconConfirmation = () => {
		if (selectedIcon.length > 2) {
			setIsRemoveIconModalOpen(true)
			setSelectedIcon('1')
		} else {
			setDefaultIconsRemoveInfo(true)
		}
	}

	const onIconUpload = e => {
		const file = e.target.files[0]

		const { name } = file

		let reader = new FileReader()

		reader.addEventListener('load', e => {
			// Limit file size to 0.5 kB

			if (file.size > 524288) {
				setTooLargeIcon(true)
				svg_uploader.current.value = ''
			} else {
				const encoded = encode(e.target.result)

				const newIcon = {
					name: name,
					icon: encoded,
				}
				dispatchMatcher(dispatchAppData, action.UPLOAD_ICON, newIcon)
				setTooLargeIcon(false)
			}
		})
		reader.readAsText(file)
	}

	return (
		<StyledIconsPickerWrapper>
			<StyledIconsWrapper>
				{icons.icons.map(icon => (
					<StyledImg
						key={icon.id}
						src={`data:image/svg+xml;base64,${icon.icon}`}
						onClick={onIconSelectHandler}
						id={icon.id}
						alt={icon.name}
						name={icon.name}
						selected={icon.id === icons.selectedIcon.id ? true : false}
					/>
				))}
			</StyledIconsWrapper>

			<StyledInput
				id='icon-size'
				name='icon-size'
				label='Icon size'
				variant='outlined'
				defaultValue={icons.selectedIcon.size}
				onChange={e => onChange(e.target, action.SET_ICON_SIZE)}
				size='small'
			/>
			{tooLargeIcon && <StyledInfo>This file is too large</StyledInfo>}
			{defaultIconsRemoveInfo && (
				<StyledInfo>You can't remove default icons</StyledInfo>
			)}
			<StyledButtonsWrapper>
				<StyledButton variant='contained' component='label' color='#2D8DE8'>
					<AddCircleOutlineIcon style={{ color: '#fff' }} />
					<input
						accept='image/svg+xml'
						type='file'
						hidden
						onChange={onIconUpload}
						id='icon-uploader'
						ref={svg_uploader}
					/>
				</StyledButton>

				<StyledButton
					variant='contained'
					onClick={onRemoveIconConfirmation}
					color='#de1919'>
					<DeleteForeverIcon style={{ color: '#fff' }} />
				</StyledButton>
			</StyledButtonsWrapper>
		</StyledIconsPickerWrapper>
	)
}

export default IconSelector

const StyledIconsPickerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;
`

const StyledIconsWrapper = styled.div`
	&& {
		${({ theme }) => `

  display: flex;
	flex-wrap: wrap;
	width: 100%;
	min-width: 200px;
	padding: 5px;
	max-height: 200px;
	overflow: scroll;
  justify-content: start;
  margin-bottom: 15px;
	& > img {
		height: 42px;
		margin: 2px 0;
    padding: 2px;
    border: 2px solid transparent;
    transition: all .3s;
	}
	& > img:hover {
		cursor: pointer;
    border: 2px solid ${theme.palette.info.main};
    transform: scale(1.2);
	}
  `}
	}
`

const StyledInput = styled(TextField)`
	&& {
		${({ theme }) => `
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		& label {
			color: ${theme.palette.primary.main};
		}
		& label.Mui-focused {
			color:${theme.palette.primary.main};
		}

		& .MuiOutlinedInput-root {
			color: ${theme.palette.primary.main};
			& fieldset{
				border-color:${theme.palette.primary.main};
			}
			&:hover fieldset {
				border-color: ${theme.palette.primary.main};
			}
		}
`}
	}
`

const StyledImg = styled.img`
	background: ${props => props.selected && '#e0e0e0'};
`
const StyledInfo = styled.p`
	color: #de1919;
	text-align: center;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
		'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif;
`
const StyledButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-top: 20px;
`
const StyledButton = styled(Button)`
	&& {
		background: ${props => props.color};
	}
`
