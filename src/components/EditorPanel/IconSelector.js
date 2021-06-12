import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const IconSelector = ({ icons, onChange, action }) => {
	const onIconUpload = e => {
		console.log(e.target)
	}

	return (
		<StyledIconsPickerWrapper>
			<StyledIconsWrapper>
				{icons.icons.map(icon => (
					<img
						src={`data:image/svg+xml;base64,${icon.icon}`}
						onClick={e => onChange(e.target, action.SET_ICON)}
						id={icon.id}
						alt={icon.name}
						name={icon.name}
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
  justify-content: space-between;
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
		width: 50%;
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
