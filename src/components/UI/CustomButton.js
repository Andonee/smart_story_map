import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import CustomTooltip from './CustomTooltip'

const CustomButton = ({
	text,
	width,
	height,
	size,
	variant = 'contained',
	onClick,
	type,
	tooltip,
	background,
	color,
}) => {
	return (
		<>
			{tooltip ? (
				<CustomTooltip title={tooltip}>
					<StyledCustomButton
						width={width}
						height={height}
						size={size}
						background={background}
						color={color}
						variant={variant}
						onClick={onClick}
						type={type}>
						{text}
					</StyledCustomButton>
				</CustomTooltip>
			) : (
				<StyledCustomButton
					width={width}
					height={height}
					size={size}
					background={background}
					color={color}
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
		min-width: ${props => props.width};
		height: ${props => props.height};
		color: ${props => props.color || '#fff'};
		& > span {
			font-size: 12px;
		}

		background: ${props => props.background || '#2D8DE8'};

		&:hover {
			background: #3f97ea;
		}
	}
`
