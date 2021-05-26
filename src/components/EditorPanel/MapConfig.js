import React from 'react'
import styled from 'styled-components'
import PlaceIcon from '@material-ui/icons/Place'
import MapIcon from '@material-ui/icons/Map'
import SyncAltIcon from '@material-ui/icons/SyncAlt'
import Popover from '@material-ui/core/Popover'
import TextField from '@material-ui/core/TextField'
import TimelineIcon from '@material-ui/icons/Timeline'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import InneIcon from '../../assets/mapIcons/inne_01.svg'
import KrainaIcon from '../../assets/mapIcons/kraina_01.svg'
import KrolestwoIcon from '../../assets/mapIcons/krolestwo_01-01.svg'
import MiastoIcon from '../../assets/mapIcons/miasto_01.svg'
import PanstwoIcon from '../../assets/mapIcons/panstwo_01.svg'
import ProwincjaIcon from '../../assets/mapIcons/prowincja_01.svg'
import WyspaIcon from '../../assets/mapIcons/wyspa_01.svg'

import { ChromePicker } from 'react-color'
import PaletteIcon from '@material-ui/icons/Palette'
import FormatColorTextIcon from '@material-ui/icons/FormatColorText'
import CustumButton from '../UI/CustumButton'

const MapConfig = ({
	onIconChange,
	onIconSizeChange,
	IconSize,
	onBasemapChange,
	onPanelsOrderChange,
	backgroundColor,
	setBackgroundColor,
	fontColor,
	setFontColor,
	setTimelineColor,
	timelineColor,
	timeAxisColor,
	setTimeAxisColor,
	timelineIconBorderColor,
	setTimelineIconBorderColor,
	timelineIconColor,
	setTimelineIconColor,
	spatialData,
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

	console.log('spatialData', spatialData)

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

	const onIconSelect = e => {
		onIconChange(e.target.name)
		setIconAnchorEl(null)
	}

	const onSizeChange = e => {
		onIconSizeChange(e.target.value)
	}

	const onBasemapSelect = e => {
		onBasemapChange(e.target.attributes.name.nodeValue)
	}

	const onOrderChange = () => {
		onPanelsOrderChange()
	}

	const onBackgroundColorChange = color => {
		const { r, g, b, a } = color.rgb
		const rgbColor = `rgba(${r}, ${g}, ${b}, ${a})`
		setBackgroundColor(rgbColor)
	}

	const onFontColorChange = color => {
		const { r, g, b, a } = color.rgb
		const rgbColor = `rgba(${r}, ${g}, ${b}, ${a})`
		setFontColor(rgbColor)
	}

	const onTimelineColorChange = color => {
		const { r, g, b, a } = color.rgb
		const rgbColor = `rgba(${r}, ${g}, ${b}, ${a})`
		setTimelineColor(rgbColor)
	}

	const onAxisColorChange = color => {
		const { r, g, b, a } = color.rgb
		const rgbColor = `rgba(${r}, ${g}, ${b}, ${a})`
		setTimeAxisColor(rgbColor)
	}

	const onIconColorBorderChange = color => {
		const { r, g, b, a } = color.rgb
		const rgbColor = `rgba(${r}, ${g}, ${b}, ${a})`
		setTimelineIconBorderColor(rgbColor)
	}

	const onIconColorChange = color => {
		const { r, g, b, a } = color.rgb
		const rgbColor = `rgba(${r}, ${g}, ${b}, ${a})`
		setTimelineIconColor(rgbColor)
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
				<CustumButton
					text={<PlaceIcon />}
					size='small'
					variant='contained'
					onClick={handleIconClick}
					tooltip='Change Icon'
				/>

				<Popover
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
					<StyledIconWrapper>
						<img
							src={InneIcon}
							onClick={onIconSelect}
							name='inne_01'
							alt='inne_01'
						/>

						<img
							src={KrainaIcon}
							onClick={onIconSelect}
							name='kraina_01'
							alt='kraina_01'
						/>
						<img
							src={KrolestwoIcon}
							onClick={onIconSelect}
							name='krolestwo_01-01'
							alt='krolestwo_01-01'
						/>
						<img
							src={MiastoIcon}
							onClick={onIconSelect}
							name='miasto_01'
							alt='miasto_01'
						/>
						<img
							src={PanstwoIcon}
							onClick={onIconSelect}
							name='panstwo_01'
							alt='panstwo_01'
						/>
						<img
							src={ProwincjaIcon}
							onClick={onIconSelect}
							name='prowincja_01'
							alt='prowincja_01'
						/>
						<img
							src={WyspaIcon}
							onClick={onIconSelect}
							name='wyspa_01'
							alt='wyspa_01'
						/>
						<StyledInput
							id='icon-size'
							name='icon-size'
							label='Icon size'
							variant='outlined'
							defaultValue={IconSize}
							onChange={onSizeChange}
							// inputProps={{ maxLength: 2 }}
							size='small'
							// type='number'
						/>
					</StyledIconWrapper>
				</Popover>

				<CustumButton
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
						<StyledBasemap name='dark' onClick={onBasemapSelect}>
							Dark
						</StyledBasemap>
						<StyledBasemap name='bright' onClick={onBasemapSelect}>
							Bright
						</StyledBasemap>
					</StyledBasemapWrapper>
				</Popover>
				<CustumButton
					text={<SyncAltIcon />}
					size='small'
					variant='contained'
					onClick={onOrderChange}
					tooltip='Switch'
				/>
			</StyledConfig>
			<StyledMap>
				{spatialData.type === 'timeline' && (
					<>
						<CustumButton
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
								onChange={onTimelineColorChange}
								color={timelineColor}
							/>
						</Popover>
					</>
				)}
				<CustumButton
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
						onChange={onBackgroundColorChange}
						color={backgroundColor}
					/>
				</Popover>
				<CustumButton
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
					<ChromePicker onChange={onFontColorChange} color={fontColor} />
				</Popover>
			</StyledMap>
			{spatialData.type === 'timeline' && (
				<StyledMap>
					<CustumButton
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
						<ChromePicker onChange={onAxisColorChange} color={timeAxisColor} />
					</Popover>

					<CustumButton
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
							onChange={onIconColorChange}
							color={timelineIconColor}
						/>
					</Popover>

					<CustumButton
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
							onChange={onIconColorBorderChange}
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
