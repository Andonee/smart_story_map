import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: theme.shadows[5],
		position: 'relative',
	},
	paper: {
		boxShadow: theme.shadows[5],
		border: `2px solid ${theme.palette.primary.main}`,
		backgroundColor: '#fff',
		padding: '10px',
		position: 'relative',
		outline: 'none',
		maxWidth: '45%',
		[theme.breakpoints.down('sm')]: {
			height: 'auto',
			width: '95%',
			maxWidth: '95%',
		},
	},
	closeBtn: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		color: theme.palette.primary.main,

		'&:hover': {
			cursor: 'pointer',
		},
	},
	image: {
		width: '100%',
		// height: '100%',
		[theme.breakpoints.down('sm')]: {
			// height: '100%',
			width: '100%',
		},
	},
}))

const ImageModal = ({ isOpen, setIsOpen }) => {
	const classes = useStyles()
	const [open, setOpen] = React.useState(isOpen.isOpen)

	useEffect(() => {
		setOpen(isOpen.isOpen)
	}, [isOpen])

	const handleClose = () => {
		setOpen(false)
		setIsOpen({
			isOpen: false,
			img: '',
		})
	}

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<IconButton
						className={classes.closeBtn}
						onClick={handleClose}
						size='small'
					>
						<CloseIcon onClick={handleClose} />
					</IconButton>
					<img src={isOpen.img} alt={isOpen.img} className={classes.image} />
				</div>
			</Fade>
		</Modal>
	)
}

export default ImageModal
