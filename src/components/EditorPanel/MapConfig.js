import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PlaceIcon from '@material-ui/icons/Place'
import MapIcon from '@material-ui/icons/Map'
import SyncAltIcon from '@material-ui/icons/SyncAlt'
import Popover from '@material-ui/core/Popover'

import InneIcon from '../../assets/mapIcons/inne_01.svg'
import KrainaIcon from '../../assets/mapIcons/kraina_01.svg'
import KrolestwoIcon from '../../assets/mapIcons/krolestwo_01-01.svg'
import MiastoIcon from '../../assets/mapIcons/miasto_01.svg'
import PanstwoIcon from '../../assets/mapIcons/panstwo_01.svg'
import ProwincjaIcon from '../../assets/mapIcons/prowincja_01.svg'
import WyspaIcon from '../../assets/mapIcons/wyspa_01.svg'

const MapConfig = ({ onIconChange }) => {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
		if (!anchorEl) {
			setAnchorEl(event.currentTarget)
		} else {
			setAnchorEl(null)
		}
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const onIconSelect = (e) => {
		onIconChange(e.target.name)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	return (
		<div>
			<StyledBtn aria-describedby={id} onClick={handleClick}>
				<PlaceIcon />
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
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
					</StyledIconWrapper>
				</Popover>
			</StyledBtn>
			<StyledBtn>
				<MapIcon />
			</StyledBtn>
			<StyledBtn>
				<SyncAltIcon />
			</StyledBtn>
		</div>
	)
}

export default MapConfig

const StyledWrapper = styled.div``

const StyledBtn = styled(Button)`
	${({ theme }) => `
		margin-right: 20px;
		background: ${theme.palette.info.main};
    color: #fff;

		&:hover {
			background: ${theme.palette.info.light};
		},
		`}
`

const StyledIconWrapper = styled.div`
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
`
