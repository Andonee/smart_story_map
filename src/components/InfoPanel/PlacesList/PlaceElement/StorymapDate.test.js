import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../../../test/testUtils'
import StorymapDate from './StorymapDate'

const setup = (date = '') => shallow(<StorymapDate date={date} />)

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-StorymapDate')
	expect(component).toHaveLength(1)
})

test('renders date from props', () => {
	const wrapper = setup('dummy date')
	const component = findByTestAttr(wrapper, 'component-StorymapDate').text()
	expect(component).toBe('dummy date')
})
