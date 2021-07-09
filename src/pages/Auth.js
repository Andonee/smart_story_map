import { useState, useContext, useEffect } from 'react'
import backgroundImage from '../assets/images/story-map-auth.jpg'
import Form from '../components/Form/Form'
import AuthContext from '../store/auth-context'
import CustomModal from '../components/UI/CustomModal'
import CustomButton from '../components/UI/CustomButton'
import translate from '../utils/translate'

import styled from 'styled-components/macro'

const Auth = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const onModalClose = () => {
		setIsModalOpen(false)
	}
	const authContext = useContext(AuthContext)

	// useEffect(() => {
	// 	if (!authContext.token && authContext.userName) setIsModalOpen(true)
	// }, [authContext])

	return (
		<StyledContainer>
			<StyledImage src={backgroundImage} alt='story map auth' />
			<Form />
			<CustomModal onModalClose={onModalClose} modalIsOpen={isModalOpen}>
				<StyledModalContent>
					<p>
						{translate(
							'modal.session',
							'Your session has expired. Please log in.'
						)}
					</p>
					<StyledCloseButton
						text='OK'
						size='small'
						variant='contained'
						onClick={onModalClose}
					/>
				</StyledModalContent>
			</CustomModal>
		</StyledContainer>
	)
}

export default Auth

const StyledContainer = styled.div`
	display: flex;
	height: 100vh;
`

const StyledImage = styled.img`
	height: 100%;
	filter: brightness(90%);
`
const StyledModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;

	& > p {
		margin-bottom: 20px;
		font-weight: bold;
		font-family: 'Lato', sans-serif;
	}
`

const StyledCloseButton = styled(CustomButton)`
	&& {
		margin-top: 20px;
		background: red;
		width: 1000px;
		display: none;
	}
`
