import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../../../test/testUtils'
import Video from './Video'

const setup = (video = '') => shallow(<Video video={video} />)

describe('Video component', () => {
	test('renders without error', () => {
		const wrapper = setup()
		const component = findByTestAttr(wrapper, 'component-video')
		expect(component).toHaveLength(1)
	})
})

describe('Video iframe', () => {
	test('renders without error', () => {
		const wrapper = setup()
		const component = findByTestAttr(wrapper, 'video-iframe')
		expect(component).toHaveLength(1)
	})

	test('renders video from props', () => {
		const wrapper = setup('dummy video')
		const iframe = findByTestAttr(wrapper, 'video-iframe')
		const video = iframe.prop('src')
		expect(video).toBe('dummy video')
	})
})
