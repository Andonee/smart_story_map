import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../../../test/testUtils'
import Address from './Address'

const setup = (address = '') => shallow(<Address address={address} />)

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-address')
	expect(component).toHaveLength(1)
})

test('renders address from props', () => {
	const wrapper = setup('dummy address')
	const component = findByTestAttr(wrapper, 'component-address').text()
	expect(component).toBe('dummy address')
})
