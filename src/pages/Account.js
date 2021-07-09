import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../store/auth-context'
import MapPreview from '../components/Form/MapPreview'
import StoryMapStructure from '../utils/story-map-structure.json'
import TimelineStructure from '../utils/timeline-structure.json'
import MapPreviewStructure from '../utils/map-preview-structure.json'
import { nanoid } from 'nanoid'
import { BaseUrl } from '../utils/baseUrl'
import styled from 'styled-components/macro'
import translate from '../utils/translate'
import useHttp from '../hooks/useHttp'

const Account = () => {
	const authContext = useContext(AuthContext)
	const history = useHistory()

	const [maps, setMaps] = useState()
	const [userName, setUserName] = useState()
	const [reload, setReload] = useState(false)

	const { sendRequest } = useHttp()

	useEffect(() => {
		const user = authContext.userName
		setUserName(user)
		localStorage.setItem('user', user)
	}, [])

	useEffect(() => {
		if (!userName) return

		fetch(`${BaseUrl}/mapsInfo/${userName}`, {
			headers: {
				Authorization: 'Bearer ' + authContext.token,
			},
		})
			.then(response => {
				if (response.ok) {
					const data = response.json()
					return data
				} else {
					throw new Error()
				}
			})
			.then(data => {
				console.log(data)
				setMaps(data)
			})
			.catch(err => {
				console.log(err)
				history.replace('/story-account/')
			})

		setReload(false)
	}, [userName, reload])

	const onLogoutHandler = () => {
		authContext.logout()
		history.replace('/story-account/')
	}

	const onStoryMapCreate = async e => {
		if (!userName) return

		const type = e.target.id

		const structure =
			type === 'timeline' ? TimelineStructure : StoryMapStructure

		const mapId = nanoid(8)
		const newStoryMap = { ...structure }
		newStoryMap.id = mapId
		newStoryMap.type = type
		newStoryMap.belongsTo = userName

		MapPreviewStructure.id = mapId
		MapPreviewStructure.type = type
		MapPreviewStructure.belongsTo = userName

		try {
			const createMap = await sendRequest({
				method: 'POST',
				url: `${BaseUrl}/maps/`,
				body: newStoryMap,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + authContext.token,
				},
			})
			const createMapPreview = await sendRequest({
				method: 'POST',
				url: `${BaseUrl}/mapsInfo/`,
				body: MapPreviewStructure,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + authContext.token,
				},
			})
			if (createMap.status === 201 && createMapPreview.status === 201) {
				setReload(true)
			} else {
				throw new Error('Creating story map error. Try again.')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const onRemoveMapClickHandler = async e => {
		const mapId = e.target.parentElement.id || e.target.id
		const user = userName

		const mapList = maps.filter(map => map.id !== mapId)
		setMaps(mapList)
		try {
			const removeMap = await sendRequest({
				method: 'DELETE',
				url: `${BaseUrl}/maps/${user}/${mapId}`,
				headers: {
					Authorization: 'Bearer ' + authContext.token,
				},
			})
			const removeMapPreview = await sendRequest({
				method: 'DELETE',
				url: `${BaseUrl}/mapsInfo/${mapId}`,
				headers: {
					Authorization: 'Bearer ' + authContext.token,
				},
			})
			if (removeMap.ok && removeMapPreview.ok) {
				setReload(true)
			} else {
				throw new Error('Creating story map error. Try again.')
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<StyledMapsWrapper>
			<StyledLogoutButton onClick={onLogoutHandler}>
				{translate('account.logout', 'Logout')}
			</StyledLogoutButton>
			<StyledStoryMapButton id='story map' onClick={onStoryMapCreate}>
				{translate('account.createStoryMap', 'Create a Story Map')}
			</StyledStoryMapButton>
			<StyledTimelineButton id='timeline' onClick={onStoryMapCreate}>
				{translate('account.createTimeline', 'Create a Timeline')}
			</StyledTimelineButton>
			{maps?.length > 0
				? maps?.map(el => (
						<MapPreview
							key={el.id}
							id={el.id}
							userId={el.userId}
							title={el.title}
							description={el.description}
							places={el.places}
							type={el.type}
							basemap={el.basemap}
							user={userName}
							onRemoveMapClickHandler={onRemoveMapClickHandler}
						/>
				  ))
				: 'Utwórz swoją pierwszą mapę'}
		</StyledMapsWrapper>
	)
}

export default Account

const StyledMapsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	// justify-content: space-evenly;
	margin-left: auto;
	margin-right: auto;
	width: 90%;
	margin-top: 100px;
`
const StyledLogoutButton = styled.button`
	position: fixed;
	top: 20px;
	right: 20px;
	width: 100px;
	height: 40px;
	background: #617bff;
	color: #fff;
	border: none;
	border-radius: 3px;
	box-shadow: 2px 1px 3px 0px #848282;
	transition: all 0.3s;

	&:hover {
		cursor: pointer;
		background: #748afa;
	}
`
const StyledStoryMapButton = styled.button`
	position: fixed;
	top: 70px;
	right: 20px;
	width: 100px;
	height: 40px;
	background: #617bff;
	color: #fff;
	border: none;
	border-radius: 3px;
	box-shadow: 2px 1px 3px 0px #848282;
	transition: all 0.3s;

	&:hover {
		cursor: pointer;
		background: #748afa;
	}
`
const StyledTimelineButton = styled.button`
	position: fixed;
	top: 120px;
	right: 20px;
	width: 100px;
	height: 40px;
	background: #617bff;
	color: #fff;
	border: none;
	border-radius: 3px;
	box-shadow: 2px 1px 3px 0px #848282;
	transition: all 0.3s;

	&:hover {
		cursor: pointer;
		background: #748afa;
	}
`
