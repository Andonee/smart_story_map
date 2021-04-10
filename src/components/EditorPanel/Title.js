import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const Title = ({ title, onTitleChange }) => {
	return (
		<StyledWrapper>
			{title.isEdited ? (
				<StyledInput
					id='map-title'
					name='title'
					label='Map Title'
					variant='outlined'
					defaultValue={title.title}
					onChange={onTitleChange}
					inputProps={{ maxLength: 120 }}
					size='small'
				/>
			) : (
				<StyledDescription>{title.title}</StyledDescription>
			)}
		</StyledWrapper>
	)
}

export default Title

const StyledWrapper = styled.div`
	height: 50px;
	display: flex;
`

const StyledDescription = styled.div`
	font-size: 16px;
	margin-left: 20px;
`

const StyledInput = styled(TextField)`
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
`
