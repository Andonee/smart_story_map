import { shallow } from 'enzyme'
import PlaceDescription from './PlaceDescription'
import { findByTestAttr } from '../../../../../test/testUtils'

const setup = (description = '') =>
	shallow(<PlaceDescription description={description} />)

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-placeDescription')
	expect(component.length).toBe(1)
})

test('renders non-empty place description', () => {
	const wrapper = setup('dummy description')
	const component = findByTestAttr(wrapper, 'component-placeDescription').text()
	expect(component).toBe('dummy description')
})
