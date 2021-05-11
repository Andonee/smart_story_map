import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const CostumButton = ({ text, width, size, variant, onClick, type }) => {
	return (
		<StyledCostumButton
			width={width}
			size={size}
			variant={variant}
			onClick={onClick}
			type={type}
		>
			{text}
		</StyledCostumButton>
	)
}

export default CostumButton

const StyledCostumButton = styled(Button)`
	&& {
		width: ${props => props.width};
		color: #fff;
		& > span {
			font-size: 12px;
		}
		${({ theme }) => `{
		background: ${theme.palette.info.main};

		&:hover {
			background: ${theme.palette.info.light};
		}
	}`}
	}
`
