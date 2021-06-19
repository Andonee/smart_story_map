import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import translate from '../../utils/translate'

const Title = ({ title, onTitleChange }) => {
	return (
		<StyledWrapper expanded={title.isEdited}>
			{title.isEdited ? (
				<StyledInput
					id='map-title'
					name='title'
					label={translate('form.label.mapTitle', 'Map title')}
					variant='outlined'
					multiline
					defaultValue={title.title}
					onChange={onTitleChange}
					inputProps={{ maxLength: 120 }}
					size='small'
					rows={4}
				/>
			) : (
				<StyledDescription>{title.title}</StyledDescription>
			)}
		</StyledWrapper>
	)
}

export default Title

const StyledWrapper = styled.div`
	height: 100px;
	display: flex;
	margin: 5px 0;
	padding-top: 5px;
`

const StyledDescription = styled.div`
	font-size: 16px;
	margin-left: 20px;
	min-height: 50px;
`

const StyledInput = styled(TextField)`
	&& {
		${({ theme }) => `
		width: 90%;
		margin-left: auto;
		margin-right: auto;

		& input {
			font-size: 12px;
		}

		&:hover label {
			transition: all .3s;
      color: ${theme.palette.info.main}
    }

`}
	}
`
