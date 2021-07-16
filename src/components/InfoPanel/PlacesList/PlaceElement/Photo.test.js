import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../../../test/testUtils'
import Photo from './Photo'

const setup = (photo = '') => shallow(<Photo photo={photo} />)

describe('photo component', () => {
	test('renders without error', () => {
		const wrapper = setup()
		const component = findByTestAttr(wrapper, 'component-photo')
		expect(component).toHaveLength(1)
	})
})

describe('photo element', () => {
	test('renders without error', () => {
		const wrapper = setup()
		const photo = findByTestAttr(wrapper, 'photo-element')
		expect(photo).toHaveLength(1)
	})

	test('img has src from prop', () => {
		const wrapper = setup('dummy photo')
		const photo = findByTestAttr(wrapper, 'photo-element')
		const src = photo.prop('src')
		expect(src).toBe('dummy photo')
	})
})
