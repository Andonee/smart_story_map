import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

const CustomTooltip = ({ title, children }) => {
	return (
		<Tooltip arrow title={title} placement='left'>
			{children}
		</Tooltip>
	)
}

export default CustomTooltip
