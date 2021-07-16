import { shallow } from 'enzyme'
import Title from './Title'
import { findByTestAttr } from '../../../test/testUtils'

const setup = () => shallow(<Title />)

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-title')
	expect(component.length).toBe(1)
})

test('renders non-empty title', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-title').text()
	expect(component).toBe('Story Map')
})
