import { FormattedMessage } from 'react-intl'

const translate = (text, defaultValue) => {
	return <FormattedMessage id={text} defaultMessage={defaultValue} />
}

export default translate
