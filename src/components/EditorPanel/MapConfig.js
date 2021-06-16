import React from 'react'
import styled from 'styled-components'
import PlaceIcon from '@material-ui/icons/Place'
import MapIcon from '@material-ui/icons/Map'
import SyncAltIcon from '@material-ui/icons/SyncAlt'
import Popover from '@material-ui/core/Popover'
import TimelineIcon from '@material-ui/icons/Timeline'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import TextField from '@material-ui/core/TextField'

import { ChromePicker } from 'react-color'
import PaletteIcon from '@material-ui/icons/Palette'
import FormatColorTextIcon from '@material-ui/icons/FormatColorText'
import CustomButton from '../UI/CustomButton'
import FontSelector from './FontSelector'
import IconSelector from './IconSelector'

import { timelineReducerActions } from '../../store/timelineReducer'
import dispatchMatcher from '../../utils/dispatchMatcher'

const MapConfig = ({
	dispatchAppData,
	appData,
	mapInstance,
	setIsRemoveIconModalOpen,
}) => {
	const [IconAnchorEl, setIconAnchorEl] = React.useState(null)
	const [BasemapAnchorEl, setBasemapAnchorEl] = React.useState(null)
	const [BackgroundColorAnchorEl, setBackgroundColorAnchorEl] =
		React.useState(null)
	const [TimelineColorAnchorEl, setTimelineColorAnchorEl] = React.useState(null)
	const [FontColorAnchorEl, setFontColorAnchorEl] = React.useState(null)
	const [AxisColorAnchorEl, setAxisColorAnchorEl] = React.useState(null)
	const [IconColorAnchorEl, setIconColorAnchorEl] = React.useState(null)
	const [IconColorBorderAnchorEl, setIconColorBorderAnchorEl] =
		React.useState(null)

	console.log('appData', appData)

	const {
		fontColor,
		timelineColor,
		timeAxisColor,
		timelineIconBorderColor,
		timelineIconColor,
		backgroundColor,
		panelsOrder,
	} = appData.spatialData.data.style

	const handleIconClick = e => {
		setIconAnchorEl(e.currentTarget)
		if (!IconAnchorEl) {
			setIconAnchorEl(e.currentTarget)
		} else {
			if (e.target.nodeName === 'INPUT') return
			setIconAnchorEl(null)
		}
	}

	const handleBasemapClick = e => {
		setBasemapAnchorEl(e.currentTarget)
		if (!BasemapAnchorEl) {
			setBasemapAnchorEl(e.currentTarget)
		} else {
			setBasemapAnchorEl(null)
		}
	}

	const handleBackgroundColorClick = e => {
		if (!BackgroundColorAnchorEl) {
			setBackgroundColorAnchorEl(e.currentTarget)
		} else {
			if (e.target.className === 'saturation-white') return
			setBackgroundColorAnchorEl(null)
		}
	}

	const handlTimelineColorClick = e => {
		if (!BackgroundColorAnchorEl) {
			setTimelineColorAnchorEl(e.currentTarget)
		} else {
			if (e.target.className === 'rgb(33, 150, 243)') return
			setTimelineColorAnchorEl(null)
		}
	}

	const handleFontColorClick = e => {
		if (!FontColorAnchorEl) {
			setFontColorAnchorEl(e.currentTarget)
		} else {
			if (e.target.className === 'saturation-white') return
			setFontColorAnchorEl(null)
		}
	}

	const handleAxisColorClick = e => {
		if (!AxisColorAnchorEl) {
			setAxisColorAnchorEl(e.currentTarget)
		} else {
			if (e.target.className === 'rgb(33, 150, 243)') return
			setAxisColorAnchorEl(null)
		}
	}

	const handleIconColorBorderClick = e => {
		if (!IconColorBorderAnchorEl) {
			setIconColorBorderAnchorEl(e.currentTarget)
		} else {
			if (e.target.className === 'rgb(255, 255, 255)') return
			setIconColorBorderAnchorEl(null)
		}
	}

	const handleIconColorClick = e => {
		if (!IconColorAnchorEl) {
			setIconColorAnchorEl(e.currentTarget)
		} else {
			if (e.target.className === 'rgb(255, 255, 255)') return
			setIconColorAnchorEl(null)
		}
	}

	const handleIconClose = () => {
		setIconAnchorEl(null)
	}

	const handleBasemapClose = () => {
		setBasemapAnchorEl(null)
	}

	const handlBackgroundColorClose = () => {
		setBackgroundColorAnchorEl(null)
	}

	const handlTimelineColorClose = () => {
		setTimelineColorAnchorEl(null)
	}

	const handlFontColorClose = () => {
		setFontColorAnchorEl(null)
	}

	const handlAxisColorClose = () => {
		setAxisColorAnchorEl(null)
	}

	const handlIconColorBorderClose = () => {
		setIconColorBorderAnchorEl(null)
	}

	const handlIconColorClose = () => {
		setIconColorAnchorEl(null)
	}

	const onChange = (value, type) => {
		let propValue

		if (value.rgb) {
			const { r, g, b, a } = value.rgb
			propValue = `rgba(${r}, ${g}, ${b}, ${a})`
		} else if (value.src?.includes('data:image/svg+xml;base64')) {
			mapInstance.layer('places').remove()
			propValue = value
		} else if (value.name === 'icon-size') {
			mapInstance.layer('places').remove()
			propValue = value.value
		} else if (value.name === 'panels') {
			if (panelsOrder.infoPanel === -1 && panelsOrder.editorPanel === 1) {
				propValue = {
					infoPanel: 1,
					editorPanel: -1,
				}
			} else {
				propValue = {
					infoPanel: -1,
					editorPanel: 1,
				}
			}
		} else if (value.attributes.name.nodeValue === 'basemap') {
			propValue = value.id
		}

		dispatchMatcher(dispatchAppData, type, propValue)
	}

	const openIconPicker = Boolean(IconAnchorEl)
	const iconId = openIconPicker ? 'icon-picker' : undefined
	const openBasemapPicker = Boolean(BasemapAnchorEl)
	const basemapId = openBasemapPicker ? 'basemap-picker' : undefined
	const openBackgroundColorPicker = Boolean(BackgroundColorAnchorEl)
	const openTimelineColorPicker = Boolean(TimelineColorAnchorEl)
	const openAxisColorPicker = Boolean(AxisColorAnchorEl)
	const openIconColorPicker = Boolean(IconColorAnchorEl)
	const openIconColorBorderPicker = Boolean(IconColorBorderAnchorEl)

	const backgroundColorId = openBackgroundColorPicker
		? 'backgroundColor-picker'
		: undefined
	const timelineColorId = openTimelineColorPicker
		? 'timelineColor-picker'
		: undefined

	const axisColorId = openAxisColorPicker ? 'axisColor-picker' : undefined

	const iconColorId = openIconColorPicker ? 'iconColor-picker' : undefined

	const iconColorBorderId = openIconColorBorderPicker
		? 'iconColorBorder-picker'
		: undefined

	const openFontColorPicker = Boolean(FontColorAnchorEl)
	const fontColorId = openFontColorPicker ? 'fontColor-picker' : undefined

	return (
		<>
			<StyledConfig>
				<CustomButton
					text={<PlaceIcon />}
					size='small'
					variant='contained'
					onClick={handleIconClick}
					tooltip='Change Icon'
				/>

				<StyledPopover
					id={iconId}
					open={openIconPicker}
					anchorEl={IconAnchorEl}
					onClose={handleIconClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}>
					<IconSelector
						icons={appData.spatialData.data.style}
						onChange={onChange}
						action={timelineReducerActions}
						dispatchAppData={dispatchAppData}
						setIsRemoveIconModalOpen={setIsRemoveIconModalOpen}
						mapId={appData.spatialData.id}
					/>
				</StyledPopover>

				<CustomButton
					text={<MapIcon />}
					size='small'
					variant='contained'
					onClick={handleBasemapClick}
					tooltip='Change basemap'
				/>

				<Popover
					id={basemapId}
					open={openBasemapPicker}
					anchorEl={BasemapAnchorEl}
					onClose={handleBasemapClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}>
					<StyledBasemapWrapper>
						<StyledBasemap
							id='dark'
							name='basemap'
							onClick={e =>
								onChange(e.target, timelineReducerActions.SET_BASEMAP)
							}>
							Dark
						</StyledBasemap>
						<StyledBasemap
							id='bright'
							name='basemap'
							onClick={e =>
								onChange(e.target, timelineReducerActions.SET_BASEMAP)
							}>
							Bright
						</StyledBasemap>
					</StyledBasemapWrapper>
				</Popover>
				<CustomButton
					text={<SyncAltIcon />}
					size='small'
					variant='contained'
					onClick={e =>
						onChange(
							{ name: 'panels' },
							timelineReducerActions.SET_PANELS_ORDER
						)
					}
					tooltip='Switch'
				/>
			</StyledConfig>
			<StyledMap>
				{appData.spatialData.type === 'timeline' && (
					<>
						<CustomButton
							text={<PaletteIcon />}
							size='small'
							variant='contained'
							onClick={handlTimelineColorClick}
							tooltip='Change timeline color'
						/>
						<Popover
							id={timelineColorId}
							open={openTimelineColorPicker}
							anchorEl={TimelineColorAnchorEl}
							onClose={handlTimelineColorClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}>
							<ChromePicker
								onChange={color =>
									onChange(color, timelineReducerActions.SET_TIMELINE_COLOR)
								}
								color={timelineColor}
							/>
						</Popover>
					</>
				)}
				<CustomButton
					text={<FormatColorFillIcon />}
					size='small'
					variant='contained'
					onClick={handleBackgroundColorClick}
					tooltip='Change sidebar color'
				/>

				<Popover
					id={backgroundColorId}
					open={openBackgroundColorPicker}
					anchorEl={BackgroundColorAnchorEl}
					onClose={handlBackgroundColorClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}>
					<ChromePicker
						onChange={color =>
							onChange(color, timelineReducerActions.SET_BACKGROUND_COLOR)
						}
						color={backgroundColor}
					/>
				</Popover>
				<CustomButton
					text={<FormatColorTextIcon />}
					size='small'
					variant='contained'
					onClick={handleFontColorClick}
					tooltip='Change text color'
				/>

				<Popover
					id={fontColorId}
					open={openFontColorPicker}
					anchorEl={FontColorAnchorEl}
					onClose={handlFontColorClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}>
					<FontSelector
						dispatchAppData={dispatchAppData}
						font={appData.spatialData.data.style.font}
					/>
					<ChromePicker
						onChange={color =>
							onChange(color, timelineReducerActions.SET_FONT_COLOR)
						}
						color={fontColor}
					/>
				</Popover>
			</StyledMap>
			{appData.spatialData.type === 'timeline' && (
				<StyledMap>
					<CustomButton
						text={<TimelineIcon />}
						size='small'
						variant='contained'
						onClick={handleAxisColorClick}
						tooltip='Change timeline color'
					/>

					<Popover
						id={axisColorId}
						open={openAxisColorPicker}
						anchorEl={AxisColorAnchorEl}
						onClose={handlAxisColorClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}>
						<ChromePicker
							onChange={color =>
								onChange(color, timelineReducerActions.SET_TIMEAXIS)
							}
							color={timeAxisColor}
						/>
					</Popover>

					<CustomButton
						text={<FiberManualRecordIcon />}
						size='small'
						variant='contained'
						onClick={handleIconColorClick}
						tooltip='Change timeline icon color'
					/>

					<Popover
						id={iconColorId}
						open={openIconColorPicker}
						anchorEl={IconColorAnchorEl}
						onClose={handlIconColorClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}>
						<ChromePicker
							onChange={color =>
								onChange(color, timelineReducerActions.SET_ICON_COLOR)
							}
							color={timelineIconColor}
						/>
					</Popover>

					<CustomButton
						text={<RadioButtonUncheckedIcon />}
						size='small'
						variant='contained'
						onClick={handleIconColorBorderClick}
						tooltip='Change timeline icon border color'
					/>

					<Popover
						id={iconColorBorderId}
						open={openIconColorBorderPicker}
						anchorEl={IconColorBorderAnchorEl}
						onClose={handlIconColorBorderClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}>
						<ChromePicker
							onChange={color =>
								onChange(color, timelineReducerActions.SET_ICON_BORDER)
							}
							color={timelineIconBorderColor}
						/>
					</Popover>
				</StyledMap>
			)}
		</>
	)
}

export default MapConfig

const StyledIconWrapper = styled.div`
	&& {
		max-width: 200px;
		display: flex;
		justify-content: start;
		padding: 5px;
		flex-wrap: wrap;

		& > img {
			width: 25px;
			padding: 5px;

			&:hover {
				cursor: pointer;
			}
		}
	}
`

const StyledBasemapWrapper = styled.div`
	&& {
		display: flex;
		flex-direction: column;
		width: 150px;
		align-items: center;
	}
`

const StyledBasemap = styled.div`
	&& {
		margin: 5px 0;
		&:hover {
			cursor: pointer;
			background: #ccc;
		}
	}
`

const StyledInput = styled(TextField)`
	&& {
		${({ theme }) => `
		width: 50%;
		margin-left: auto;
		margin-right: auto;
		& label {
			color: ${theme.palette.primary.main};
		}
		& label.Mui-focused {
			color:${theme.palette.primary.main};
		}

		& .MuiOutlinedInput-root {
			color: ${theme.palette.primary.main};
			& fieldset{
				border-color:${theme.palette.primary.main};
			}
			&:hover fieldset {
				border-color: ${theme.palette.primary.main};
			}
		}
`}
	}
`
const StyledMap = styled.div`
	width: 70%;
	display: flex;
	justify-content: space-between;

	margin-top: 20px;
`

const StyledConfig = styled.div`
	width: 70%;
	display: flex;
	justify-content: space-between;
`
const StyledPopover = styled(Popover)`
	&& {
		width: 300px;
		max-height: 400px;
	}
`
