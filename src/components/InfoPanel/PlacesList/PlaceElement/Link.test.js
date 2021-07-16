import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../../../test/testUtils'
import Link from './Link'

const setup = (link = '') => shallow(<Link link={link} />)

describe('link component', () => {
	test('renders without error', () => {
		const wrapper = setup()
		const component = findByTestAttr(wrapper, 'component-link')
		expect(component).toHaveLength(1)
	})
})

describe('icon component', () => {
	test('renders without error', () => {
		const wrapper = setup()
		const component = findByTestAttr(wrapper, 'component-icon')
		expect(component).toHaveLength(1)
	})
})

describe('Link value', () => {
	test('renders without error', () => {
		const wrapper = setup()
		const component = findByTestAttr(wrapper, 'link-value')
		expect(component).toHaveLength(1)
	})

	test('renders link from props', () => {
		const wrapper = setup('dummy link')
		const component = findByTestAttr(wrapper, 'link-value').text()
		expect(component).toBe('dummy link')
	})

	test('link has href from prop', () => {
		const wrapper = setup('dummy link')
		const url = findByTestAttr(wrapper, 'link-value')
		const href = url.prop('href')
		expect(href).toBe('dummy link')
	})
})
