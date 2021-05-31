import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import CustomTooltip from './CustomTooltip'

const CustomButton = ({
	text,
	width,
	size,
	variant,
	onClick,
	type,
	tooltip,
}) => {
	return (
		<>
			{tooltip ? (
				<CustomTooltip title={tooltip}>
					<StyledCustomButton
						width={width}
						size={size}
						variant={variant}
						onClick={onClick}
						type={type}>
						{text}
					</StyledCustomButton>
				</CustomTooltip>
			) : (
				<StyledCustomButton
					width={width}
					size={size}
					variant={variant}
					onClick={onClick}
					type={type}>
					{text}
				</StyledCustomButton>
			)}
		</>
	)
}

export default CustomButton

const StyledCustomButton = styled(Button)`
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
