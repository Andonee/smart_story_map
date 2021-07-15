import { useState, useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import Title from './Title'
import { useHistory } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import { BaseUrl } from '../../utils/baseUrl'
import styled from 'styled-components/macro'
import jwt_decode from 'jwt-decode'

const Form = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	const { sendRequest } = useHttp()

	const authContext = useContext(AuthContext)

	const loginRef = useRef()
	const passwordRef = useRef()

	const history = useHistory()

	const onActionChangeHandler = e => {
		e.preventDefault()
		setIsLogin(!isLogin)
	}

	const onSubmitHandler = async e => {
		e.preventDefault()

		const enteredLogin = loginRef.current.value
		const enteredPassword = passwordRef.current.value

		try {
			let url
			if (isLogin) {
				url = `${BaseUrl}/login`
			} else {
				url = `${BaseUrl}/signup`
			}

			const request = await sendRequest({
				method: 'POST',
				url: url,
				body: {
					user: enteredLogin || '',
					password: enteredPassword,
				},
			})

			if (request.status === 200) {
				setErrorMessage('')
				const data = request.data

				const decodedToken = jwt_decode(data.token)

				const expirationTime = +decodedToken.exp * 1000

				authContext.login(data.token, expirationTime)

				authContext.user(data.user)
				history.replace(`/smart_story_map/maps/${data.user}`)
			} else {
				request.json().then(data => setErrorMessage(data.message))
				throw new Error('data')
			}
		} catch (err) {
			console.log('Submit error', err)
		}
	}

	return (
		<StyledFormWrapper>
			<Title />
			<StyledFormSection>
				<StyledFormTitle>Witamy na Story Map</StyledFormTitle>
				<StyledForm onSubmit={onSubmitHandler}>
					<StyledFormInput
						type='text'
						id='login'
						placeholder='Login'
						ref={loginRef}
						required
					/>
					<StyledFormInput
						type='password'
						id='password'
						placeholder='Hasło'
						ref={passwordRef}
					/>
					<StyledFormError>{errorMessage}</StyledFormError>
					<StyledFormActions>
						<button>{!isLogin ? 'Utwórz nowe konto' : 'Zaloguj'}</button>
						<button onClick={onActionChangeHandler}>
							{isLogin ? 'Utwórz konto' : 'Przełącz do logowania'}
						</button>
					</StyledFormActions>
				</StyledForm>
			</StyledFormSection>
		</StyledFormWrapper>
	)
}
export default Form

const StyledFormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`
const StyledFormSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10%;
	width: 50%;
	border: 1px solid #848282;
	padding: 100px;
	box-shadow: 2px 1px 3px 0px #848282;
`
const StyledFormTitle = styled.h1`
	font-family: 'Rancho', cursive;
	font-size: 36px;
	letter-spacing: 3px;
`
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 65%;
	margin-top: 20px;
`
const StyledFormInput = styled.input`
	width: 80%;
	padding: 5px 10px;
	margin-bottom: 20px;
	border: 1px solid rgb(41, 41, 41);
	transition: all 0.3s;

	&:focus,
	&:active,
	&:hover {
		box-shadow: 0px 0px 5px 2px #617bff;
		outline: none;
		border: 1px solid transparent;
	}
`

const StyledFormError = styled.p`
	color: #d32a2a;
`
const StyledFormActions = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	width: 80%;

	& > button {
		background: #617bff;
		color: #fff;
		padding: 5px;
		border: none;
		-webkit-box-shadow: 3px 5px 5px 0px #474747;
		box-shadow: 1px 2px 5px 0px #474747;
		margin-bottom: 10px;
		transition: all 0.3s;

		&:focus,
		&:active {
			box-shadow: 0px 0px 5px 2px #617bff;
			outline: none;
			border: 1px solid transparent;
		}

		&:hover {
			cursor: pointer;
			background: #748afa;
			transform: translateY(-3px);
		}
	}
`
