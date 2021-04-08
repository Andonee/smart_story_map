import React, { useEffect } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'

const ImageModal = ({ isOpen, setIsOpen }) => {
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
		<Wrapper
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<Paper>
					<CloseBtn onClick={handleClose} size='small'>
						<CloseIcon onClick={handleClose} />
					</CloseBtn>
					<Img src={isOpen.img} alt={isOpen.img} />
				</Paper>
			</Fade>
		</Wrapper>
	)
}

export default ImageModal

const Wrapper = styled(Modal)`
	${({ theme }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: theme.shadows[5];
	position: relative;
		`}
`
const Paper = styled.div`
	${({ theme }) => `
		boxShadow: theme.shadows[5];
		border: 2px solid ${theme.palette.primary.main};
		background-color: #fff;
		padding: 10px;
		position: relative;
		outline: none;
		max-width: 45%;
		${theme.breakpoints.down('sm')} {
			height: auto;
			width: 95%;
			max-width: 95%;
		},
		`}
`

const CloseBtn = styled(IconButton)`
	${({ theme }) => `
	position: absolute;
	top: 10px;
	right: 10px;
	color: ${theme.palette.primary.main};

	&:hover {
		cursor: pointer,
	}
`}
`
const Img = styled.img`
	${({ theme }) => `
		width: 100%;
		${theme.breakpoints.down('sm')} {
			width: '100%';
		},
		`}
`
