import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../../../test/testUtils'
import Audio from './Audio'

const setup = (audio = '') => shallow(<Audio audio={audio} />)

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-audio')
	expect(component).toHaveLength(1)
})

test('renders audio with src attribute from props', () => {
	const wrapper = setup('dummy audio')
	const audio = wrapper.find('source')
	const src = audio.prop('src')
	expect(src).toBe('dummy audio')
})
