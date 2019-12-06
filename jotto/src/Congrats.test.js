import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import { findByTestAttr } from '../test/testUtils'
import Congrats from './Congrats'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 *Factory function to create a shallow wrapper for the Congrats component
 * @function setup
 * @param {object} props
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
	return shallow(<Congrats {...props} />)
}

test('renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-congrats')
	expect(component.length).toBe(1)
})

test('renders no text when success prop is false', () => {})

test('renders non-empty congrats message when success prop is true', () => {})
