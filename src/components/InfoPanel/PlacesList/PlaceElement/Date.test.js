import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../../../test/testUtils'
import Date from './Date'

const setup = (date = '') => shallow(<Date date={date} />)

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-date')
	expect(component).toHaveLength(1)
})

test('renders date from props', () => {
	const wrapper = setup('dummy date')
	const component = findByTestAttr(wrapper, 'component-date').text()
	expect(component).toBe('dummy date')
})
