import { nanoid } from 'nanoid'

export const timelineInitialState = {
	spatialData: {},
	isLoading: false,
	error: false,
}

const timelineReducer = (state, action) => {
	switch (action.type) {
		case timelineReducerActions.FETCH_DATA: {
			state.isLoading = true
			state.error = false
			return
		}
		case timelineReducerActions.FETCH_SUCCESS: {
			state.isLoading = false
			state.error = false
			state.spatialData = action.payload
			return
		}
		case timelineReducerActions.FETCH_ERROR: {
			state.isLoading = false
			state.error = true
			return
		}
		case timelineReducerActions.SET_ICON: {
			state.spatialData.data.style.selectedIcon.id = action.payload.id
			state.spatialData.data.style.selectedIcon.name = action.payload.name
			state.spatialData.data.style.selectedIcon.icon =
				action.payload.src.split(',')[1]
			return
		}
		case timelineReducerActions.UPLOAD_ICON: {
			const newIcon = {
				id: nanoid(8),
				mapId: state.spatialData.id,
				name: action.payload.name,
				icon: action.payload.icon,
			}
			state.spatialData.data.style.icons = [
				...state.spatialData.data.style.icons,
				newIcon,
			]

			return
		}
		case timelineReducerActions.DELETE_ICON: {
			state.spatialData.data.style.icons =
				state.spatialData.data.style.icons.filter(
					icon => icon.id !== action.payload
				)
			return
		}
		case timelineReducerActions.SET_ICON_SIZE: {
			state.spatialData.data.style.selectedIcon.size = action.payload
			return
		}
		case timelineReducerActions.SET_BASEMAP: {
			state.spatialData.data.style.basemap = action.payload
			return
		}

		case timelineReducerActions.SET_PANELS_ORDER: {
			state.spatialData.data.style.panelsOrder = action.payload
			return
		}

		case timelineReducerActions.SET_PANEL_COLOR: {
			state.spatialData.data.style.panelColor = action.payload
			return
		}

		case timelineReducerActions.SET_TITLE: {
			state.spatialData.data.info.title = action.payload
			return
		}

		case timelineReducerActions.SET_DESCRIPTION: {
			state.spatialData.data.info.description = action.payload
			return
		}

		case timelineReducerActions.SET_TIMEAXIS: {
			state.spatialData.data.style.timeAxisColor = action.payload
			return
		}

		case timelineReducerActions.SET_ICON_BORDER: {
			state.spatialData.data.style.timelineIconBorderColor = action.payload
			return
		}

		case timelineReducerActions.SET_ICON_COLOR: {
			state.spatialData.data.style.timelineIconColor = action.payload
			return
		}

		case timelineReducerActions.SET_FONT_COLOR: {
			state.spatialData.data.style.fontColor = action.payload
			return
		}

		case timelineReducerActions.SET_FONT: {
			state.spatialData.data.style.font = action.payload
			return
		}

		case timelineReducerActions.SET_TIMELINE_COLOR: {
			state.spatialData.data.style.timelineColor = action.payload
			return
		}

		case timelineReducerActions.SET_BACKGROUND_COLOR: {
			state.spatialData.data.style.backgroundColor = action.payload
			return
		}

		case timelineReducerActions.SET_PLACES_ORDER: {
			state.spatialData.data.map.features = action.payload
			return
		}

		case timelineReducerActions.UPDATE_PLACE: {
			state.spatialData.data.map.features[action.payload.id].properties =
				action.payload.value
			return
		}

		case timelineReducerActions.DELETE_PLACE: {
			state.spatialData.data.map.features.splice(action.payload, 1)
			return
		}

		case timelineReducerActions.ADD_PLACE: {
			state.spatialData.data.map.features = [
				...state.spatialData.data.map.features,
				action.payload,
			]
			return
		}

		default: {
			return timelineInitialState
		}
	}
}

export default timelineReducer

export const timelineReducerActions = {
	FETCH_DATA: 'FETCH_DATA',
	FETCH_SUCCESS: 'FETCH_SUCCESS',
	FETCH_ERROR: 'FETCH_ERROR',
	SET_ICON: 'SET_ICON',
	UPLOAD_ICON: 'UPLOAD_ICON',
	DELETE_ICON: 'DELETE_ICON',
	SET_ICON_SIZE: 'SET_ICON_SIZE',
	SET_BASEMAP: 'SET_BASEMAP',
	SET_PANELS_ORDER: 'SET_PANELS_ORDER',
	SET_PANEL_COLOR: 'SET_PANEL_COLOR',
	SET_TITLE: 'SET_TITLE',
	SET_DESCRIPTION: 'SET_DESCRIPTION',
	SET_TIMEAXIS: 'SET_TIMEAXIS',
	SET_ICON_BORDER: 'SET_ICON_BORDER',
	SET_ICON_COLOR: 'SET_ICON_COLOR',
	SET_FONT_COLOR: 'SET_FONT_COLOR',
	SET_TIMELINE_COLOR: 'SET_TIMELINE_COLOR',
	SET_BACKGROUND_COLOR: 'SET_BACKGROUND_COLOR',
	SET_PLACES_ORDER: 'SET_PLACES_ORDER',
	SET_FONT: 'SET_FONT',
	UPDATE_PLACE: 'UPDATE_PLACE',
	DELETE_PLACE: 'DELETE_PLACE',
}
