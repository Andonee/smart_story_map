import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconArrowNarrowRight } from '@tabler/icons'

const useStyles = makeStyles(theme => ({
	constainer: {
		display: 'flex',
		alignItems: 'center',
		padding: '20px 40px',
	},
	arrow: {
		width: '24px',
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		marginLeft: '10px',
		transitionDuration: '.3s',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',

		'&:hover': {
			color: '#D3D3D3',
		},
	},
}))

const Link = ({ link }) => {
	const classes = useStyles()
	return (
		<div className={classes.constainer}>
			<div className={classes.arrow}>
				<IconArrowNarrowRight color='#545454' />
			</div>
			<a
				href={link}
				target='_blank'
				rel='noreferrer'
				className={classes.link}
				title={link}>
				{link}
			</a>
		</div>
	)
}

export default Link
