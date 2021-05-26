import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import CustumTooltip from './CustumTooltip'

const CustumButton = ({
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
				<CustumTooltip title={tooltip}>
					<StyledCustumButton
						width={width}
						size={size}
						variant={variant}
						onClick={onClick}
						type={type}>
						{text}
					</StyledCustumButton>
				</CustumTooltip>
			) : (
				<StyledCustumButton
					width={width}
					size={size}
					variant={variant}
					onClick={onClick}
					type={type}>
					{text}
				</StyledCustumButton>
			)}
		</>
	)
}

export default CustumButton

const StyledCustumButton = styled(Button)`
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
