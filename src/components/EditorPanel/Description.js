import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const Title = ({ description, onDescriptionChange }) => {
	return (
		<StyledWrapper>
			{description.isEdited ? (
				<StyledInput
					id='map-description'
					name='description'
					label='Map description'
					variant='outlined'
					multiline
					defaultValue={description.description}
					onChange={onDescriptionChange}
					inputProps={{ maxLength: 500 }}
					size='small'
					rows={5}
				/>
			) : (
				<StyledDescription>{description.description}</StyledDescription>
			)}
		</StyledWrapper>
	)
}

export default Title

const StyledWrapper = styled.div`
	height: 150px;
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
