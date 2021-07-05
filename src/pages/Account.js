import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../store/auth-context'
import MapPreview from '../components/Form/MapPreview'
import StoryMapStructure from '../utils/story-map-structure.json'
import TimelineStructure from '../utils/timeline-structure.json'
import MapPreviewStructure from '../utils/map-preview-structure.json'
import { nanoid } from 'nanoid'
import { httpRequest } from '../utils/http-request'
import { BaseUrl } from '../utils/baseUrl'
import styled from 'styled-components'

const Account = () => {
	const authContext = useContext(AuthContext)
	const history = useHistory()

	const [maps, setMaps] = useState()
	const [userName, setUserName] = useState()
	const [reload, setReload] = useState(false)

	useEffect(() => {
		// debugger
		const user = authContext.userName
		console.log('USER', user)
		setUserName(user)
		localStorage.setItem('user', user)
	}, [])

	useEffect(() => {
		if (!userName) return
		console.log('FETCH')

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

		debugger

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
			const createMap = await httpRequest(
				`${BaseUrl}/maps/`,
				'POST',
				newStoryMap,
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + authContext.token,
				}
			)
			const createMapPreview = await httpRequest(
				`${BaseUrl}/mapsInfo/`,
				'POST',

				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + authContext.token,
				},
				MapPreviewStructure
			)
			if (createMap.ok && createMapPreview.ok) {
				setReload(true)
			} else {
				throw new Error('Creating story map error. Try again.')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const onRemoveMapClickHandler = async e => {
		const mapId = e.target.id
		const user = authContext.user()

		const mapList = maps.filter(map => map.id !== mapId)
		setMaps(mapList)
		debugger
		try {
			const removeMap = await httpRequest(
				`${BaseUrl}/maps/${user}/${mapId}`,
				'DELETE',
				{
					Authorization: 'Bearer ' + authContext.token,
				}
			)
			const removeMapPreview = await httpRequest(
				`${BaseUrl}/mapsInfo/${mapId}`,
				'DELETE',
				{
					Authorization: 'Bearer ' + authContext.token,
				}
			)
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
			<StyledLogoutButton onClick={onLogoutHandler}>Wyloguj</StyledLogoutButton>
			<StyledStoryMapButton id='story map' onClick={onStoryMapCreate}>
				Utwórz Story Map
			</StyledStoryMapButton>
			<StyledTimelineButton id='timeline' onClick={onStoryMapCreate}>
				Utwórz Timeline
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
const StyledActionButtons = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	width: 100px;
	height: 40px;
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
