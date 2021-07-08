import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components/macro'
import translate from '../../utils/translate'

const Description = ({ description, onDescriptionChange }) => {
	return (
		<StyledWrapper>
			{description.isEdited ? (
				<StyledInput
					id='map-description'
					name='description'
					label={translate('form.label.mapDescription', 'Map description')}
					variant='outlined'
					multiline
					defaultValue={description.description}
					onChange={onDescriptionChange}
					inputProps={{ maxLength: 1500 }}
					size='small'
					rows={6}
					expanded={description.isEdited}
				/>
			) : (
				<StyledDescription>
					{description.description
						? description.description
						: 'Map description'}
				</StyledDescription>
			)}
		</StyledWrapper>
	)
}

export default Description

const StyledWrapper = styled.div`
	height: 150px;
	display: flex;
	overflow: ${props => props.expanded && 'scroll'};
	overflow-x: hidden;
	margin: 5px 0;
	padding-top: 5px;
`

const StyledDescription = styled.div`
	font-size: 16px;
	margin-left: 20px;
`

const StyledInput = styled(TextField)`
	&& {
		${({ theme }) => `
		width: 90%;
		margin-left: auto;
		margin-right: auto;

		& textarea {
			font-size: 12px;
		}

		&:hover label {
			transition: all .3s;
      color: ${theme.palette.info.main}
    }
`}
	}
`
