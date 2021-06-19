import { useContext } from 'react'
import CustomButton from './CustomButton'
import styled from 'styled-components'
import { Context } from './LanguageWrapper'
import TranslateIcon from '@material-ui/icons/Translate'

const Toolbox = () => {
	const context = useContext(Context)
	return (
		<StyledToolboxWrapper>
			<CustomButton
				text={<TranslateIcon />}
				size='small'
				variant='contained'
				onClick={context.onLanguageChange}
			/>
		</StyledToolboxWrapper>
	)
}

export default Toolbox

const StyledToolboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 60px;
	right: 355px;
	z-index: 10;
`
