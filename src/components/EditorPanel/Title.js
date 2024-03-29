import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled, { css } from 'styled-components/macro'
import translate from '../../utils/translate'

const Title = ({ title, onTitleChange }) => {
	return (
		<StyledWrapper height={title.isEdited}>
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
				<StyledTitle>{title.title ? title.title : 'Map title'}</StyledTitle>
			)}
		</StyledWrapper>
	)
}

export default Title

const StyledWrapper = styled.div`
	display: flex;
	margin: 5px 0;
	padding-top: 5px;
	height: 25px;

	${props =>
		props.height &&
		css`
			height: 100px;
		`}
`

const StyledTitle = styled.div`
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
