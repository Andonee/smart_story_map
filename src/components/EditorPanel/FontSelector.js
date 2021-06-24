import { useState } from 'react'
import FontPicker from 'font-picker-react'
import styled from 'styled-components'
import translate from '../../utils/translate'

import { timelineReducerActions } from '../../store/timelineReducer'
import dispatchMatcher from '../../utils/dispatchMatcher'

const FontSelector = ({ dispatchAppData, font }) => {
	const [activeFontFamily, setActiveFontFamily] = useState(font)

	const onFontChangeHandler = selected => {
		setActiveFontFamily(selected)
		dispatchMatcher(dispatchAppData, timelineReducerActions.SET_FONT, selected)
	}

	return (
		<StyledWrapper>
			<FontPicker
				apiKey={process.env.REACT_APP_FONT_APIKEY}
				activeFontFamily={activeFontFamily.family}
				onChange={onFontChangeHandler}
				limit={100}></FontPicker>
			<StyledFontPreview className='apply-font'>
				{translate(
					'mapConfig.font.preview',
					'The font will be applied to this text.'
				)}
			</StyledFontPreview>
		</StyledWrapper>
	)
}

export default FontSelector

const StyledWrapper = styled.div`
	${({ theme }) => `
&& {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 10px;
		& > div > button {
			background: ${theme.palette.info.main};
			color: #fff;
			transition: all .3s;

			& > p:before {
				border-top: 6px solid #ffffff !important;
			}
		}

		& > div > button:hover, button:focus {
			background: ${theme.palette.info.light};
		}
	}

`}
`
const StyledFontPreview = styled.p`
	text-align: justify;
`
