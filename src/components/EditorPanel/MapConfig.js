import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PlaceIcon from '@material-ui/icons/Place'
import MapIcon from '@material-ui/icons/Map'
import SyncAltIcon from '@material-ui/icons/SyncAlt'
import Popover from '@material-ui/core/Popover'
import TextField from '@material-ui/core/TextField'

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
import Paper from '@material-ui/core/Paper'

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
}) => {
	const [IconAnchorEl, setIconAnchorEl] = React.useState(null)
	const [BasemapAnchorEl, setBasemapAnchorEl] = React.useState(null)
	const [BackgroundColorAnchorEl, setBackgroundColorAnchorEl] = React.useState(
		null
	)
	const [FontColorAnchorEl, setFontColorAnchorEl] = React.useState(null)

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

	const handleFontColorClick = e => {
		if (!FontColorAnchorEl) {
			setFontColorAnchorEl(e.currentTarget)
		} else {
			if (e.target.className === 'saturation-white') return
			setFontColorAnchorEl(null)
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

	const handlFontColorClose = () => {
		setFontColorAnchorEl(null)
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

	const openIconPicker = Boolean(IconAnchorEl)
	const iconId = openIconPicker ? 'icon-picker' : undefined

	const openBasemapPicker = Boolean(BasemapAnchorEl)
	const basemapId = openBasemapPicker ? 'basemap-picker' : undefined

	const openBackgroundColorPicker = Boolean(BackgroundColorAnchorEl)
	const backgroundColorId = openBackgroundColorPicker
		? 'backgroundColor-picker'
		: undefined

	const openFontColorPicker = Boolean(FontColorAnchorEl)
	const fontColorId = openFontColorPicker ? 'fontColor-picker' : undefined

	return (
		<>
			<StyledMap>
				<StyledBtn aria-describedby={iconId} onClick={handleIconClick}>
					<PlaceIcon />
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
						}}
					>
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
				</StyledBtn>
				<StyledBtn aria-describedby={basemapId} onClick={handleBasemapClick}>
					<MapIcon />
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
						}}
					>
						<StyledBasemapWrapper>
							<StyledBasemap name='dark' onClick={onBasemapSelect}>
								Dark
							</StyledBasemap>
							<StyledBasemap name='bright' onClick={onBasemapSelect}>
								Bright
							</StyledBasemap>
						</StyledBasemapWrapper>
					</Popover>
				</StyledBtn>
			</StyledMap>
			<StyledConfig>
				<StyledBtn onClick={onOrderChange}>
					<SyncAltIcon />
				</StyledBtn>
				<StyledBtn onClick={handleBackgroundColorClick}>
					<PaletteIcon />
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
						}}
					>
						<ChromePicker
							onChange={onBackgroundColorChange}
							color={backgroundColor}
						/>
					</Popover>
				</StyledBtn>

				<StyledBtn onClick={handleFontColorClick}>
					<FormatColorTextIcon />
				</StyledBtn>

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
					}}
				>
					<ChromePicker onChange={onFontColorChange} color={fontColor} />
				</Popover>
			</StyledConfig>
		</>
	)
}

export default MapConfig

const StyledBtn = styled(Button)`
	&& {
		${({ theme }) => `
		// margin-right: 20px;
		background: ${theme.palette.info.main};
    color: #fff;

		&:hover {
			background: ${theme.palette.info.light};
		},
		`}
	}
`

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
const StyledColorPicker = styled.div`
	&& {
		width: 200px;
	}
`
const StyledMap = styled.div`
	width: 45%;
	display: flex;
	justify-content: space-between;

	margin-bottom: 20px;
`

const StyledConfig = styled.div`
	width: 70%;
	display: flex;
	justify-content: space-between;
`
