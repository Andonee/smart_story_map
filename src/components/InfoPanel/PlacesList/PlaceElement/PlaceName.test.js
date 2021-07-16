import { shallow } from 'enzyme'
import PlaceName from './PlaceName'
import { findByTestAttr } from '../../../../../test/testUtils'

const setup = (title = '') => shallow(<PlaceName title={title} />)

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-placeName')
	expect(component.length).toBe(1)
})

test('renders non-empty place name', () => {
	const wrapper = setup('dummy name')
	const component = findByTestAttr(wrapper, 'component-placeName').text()
	expect(component).toBe('dummy name')
})
