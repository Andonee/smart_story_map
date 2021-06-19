import { useState, createContext } from 'react'
import { IntlProvider } from 'react-intl'
import Polish from '../../i18n/messages/pl.json'
import English from '../../i18n/messages/en-US.json'

export const Context = createContext()

const local = navigator.language
let lang

if (local === 'pl') {
	lang = Polish
} else {
	lang = English
}

const LanguageWrapper = ({ children }) => {
	const [locale, setLocale] = useState(local)
	const [messages, setMessages] = useState(lang)

	const onLanguageChange = e => {
		const newLocale = e.target.value
		setLocale(newLocale)

		// if (newLocale === 'pl') {
		// 	setMessages(Polish)
		// } else {
		// 	setMessages(English)
		// }

		setMessages(prevState => (prevState === Polish ? English : Polish))
	}

	return (
		<Context.Provider value={{ locale, onLanguageChange }}>
			<IntlProvider messages={messages} locale={locale}>
				{children}
			</IntlProvider>
		</Context.Provider>
	)
}

export default LanguageWrapper
