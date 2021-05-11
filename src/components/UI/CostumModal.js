import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const CostumModal = ({ onModalClose, modalIsOpen, children }) => {
	const [open, setOpen] = useState(modalIsOpen)

	useEffect(() => {
		setOpen(modalIsOpen)
	}, [modalIsOpen])

	const handleClose = () => {
		setOpen(false)
		onModalClose()
	}

	return (
		<StyledModal
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
				<StyledPaper>
					<StyledCloseBtn onClick={handleClose} size='small'>
						<CloseIcon onClick={handleClose} />
					</StyledCloseBtn>
					{children}
				</StyledPaper>
			</Fade>
		</StyledModal>
	)
}

export default CostumModal

const StyledModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;
`
// const StyledPaper = styled.div`
// 	background-color: #fff;
// 	border: 2px solid #000;
// 	box-shadow: gray;
// 	padding: 5px 10px;
// 	width: 600px;
// 	max-width: 90%;
// 	max-height: 90%;
// 	overflow: scroll;
// 	overflow-x: hidden;
// `

const StyledPaper = styled.div`
	&& {
		${({ theme }) => `
		boxShadow: theme.shadows[5];
		border: 2px solid ${theme.palette.primary.main};
		background-color: #fff;
		padding: 20px 10px;
		position: relative;
		width: 600px;
		max-width: 90%;
		max-height: 90%;
		outline: none;
		max-width: 45%;
		overflow: scroll;
	overflow-x: hidden;
		${theme.breakpoints.down('sm')} {
			height: auto;
			width: 95%;
			max-width: 95%;
		},
		`}
	}
`

const StyledCloseBtn = styled(IconButton)`
	&& {
		${({ theme }) => `
	position: absolute;
	top: 10px;
	right: 10px;
	color: ${theme.palette.primary.main};
	

	&:hover {
		cursor: pointer,
	}
`}
	}
`
