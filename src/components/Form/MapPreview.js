import React, { useContext } from 'react'

import styled from 'styled-components/macro'

import mapboxlight from '../../assets/images/mapboxlight.png'
import mapboxdark from '../../assets/images/mapboxdark.png'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import CloseIcon from '@material-ui/icons/Close'

const MapPreview = ({
	title,
	description,
	places,
	type,
	basemap,
	id,
	user,
	onRemoveMapClickHandler,
}) => {
	const history = useHistory()
	const authContext = useContext(AuthContext)

	const onMapClickHandler = () => {
		const mapId = id

		history.replace(`/map/${user}/${mapId}`, { secretToken: authContext.token })
	}

	const environment = process.env.NODE_ENV

	const brightMap =
		environment === 'development'
			? mapboxlight
			: '/story-account/assets/images/mapboxlight.png'
	const darkMap =
		environment === 'development'
			? mapboxdark
			: '/story-account/assets/images/mapboxdark.png'

	let avatar = basemap === 'bright' ? brightMap : darkMap

	return (
		<StyledMapsContainer>
			<StyledCloseButton id={id} onClick={onRemoveMapClickHandler}>
				<CloseIcon />
			</StyledCloseButton>
			<StyledImageContainer>
				<StyledImage
					onClick={onMapClickHandler}
					src={`${avatar}`}
					alt={title}
				/>
				<StyledImageTextWrapper onClick={onMapClickHandler}>
					<StyledImageInfo>Otwórz mapę</StyledImageInfo>
				</StyledImageTextWrapper>
			</StyledImageContainer>
			<StyledTitle>
				<h3>{title}</h3>
			</StyledTitle>

			<StyledDescription>{description}</StyledDescription>

			<StyledMapsInfo>
				<p>
					Places: <strong>{places}</strong>
				</p>
				<p>
					Type: <strong>{type}</strong>
				</p>
			</StyledMapsInfo>
		</StyledMapsContainer>
	)
}

export default MapPreview

const StyledMapsContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 2px 1px 3px 0px #848282;
	border: 1px solid #848282;
	width: 350px;
	height: 350px;
	// align-items: center;
	margin: 20px;
	padding-top: 30px;
	transition: all 0.3s;
	border-radius: 2%;
	position: relative;

	&:hover {
		transform: translateY(-5px);
	}
`
const StyledCloseButton = styled.button`
	position: absolute;
	top: 2px;
	right: 2px;
	color: #848282;
	background: none;
	border: none;
	transition: all 0.3s;

	&:hover {
		cursor: pointer;
		background: rgb(231, 228, 228);
	}
`

const StyledImage = styled.img`
	opacity: 1;
	display: block;
	width: 100%;
	height: auto;
	transition: 0.3s ease;
	backface-visibility: hidden;
`

const StyledImageTextWrapper = styled.div`
	transition: 0.3s ease;
	opacity: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	text-align: center;
`

const StyledImageContainer = styled.div`
	position: relative;
	transition: all 0.3s;

	&:hover ${StyledImageTextWrapper} {
		opacity: 1;
		cursor: pointer;
	}

	&:hover ${StyledImage} {
		filter: brightness(50%);
		cursor: pointer;
	}
`

const StyledImageInfo = styled.div`
	background-color: #617bff;
	color: white;
	font-size: 16px;
	padding: 16px 32px;
`

const StyledTitle = styled.div`
	margin-left: 10px;
`
const StyledDescription = styled.div`
	margin-left: 10px;
	font-size: 14px;
	height: 100px;
	max-height: 100px;
	overflow: auto;
	overflow-x: hidden;
`
const StyledMapsInfo = styled.div`
	display: flex;
	justify-content: space-between;
	width: 95%;
	margin: 0 auto;
	font-size: 14px;
`
