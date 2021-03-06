import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {any} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
	const wrapper = shallow(<App {...props} />)
	if (state) wrapper.setState(state)
	return wrapper
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme ShallowWrapper to search in
 * @param {string} val - value of data-test to search by
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`)
}

test('renders without crashing', () => {
	const wrapper = setup()
	const appComponent = findByTestAttr(wrapper, 'component-app')
	expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
	const wrapper = setup()
	const button = findByTestAttr(wrapper, 'increment-button')
	expect(button.length).toBe(1)
})

test('renders counter display', () => {
	const wrapper = setup()
	const display = findByTestAttr(wrapper, 'counter-display')
	expect(display.length).toBe(1)
})

test('counter starts at 0', () => {
	const wrapper = setup()
	const initialCounterState = wrapper.state('counter')
	expect(initialCounterState).toBe(0)
})

test('renders clicking button increments counter display', () => {
	const counter = 7
	const wrapper = setup(null, { counter })

	// find button and click
	const button = findByTestAttr(wrapper, 'increment-button')
	button.simulate('click')

	//find display and test value
	const display = findByTestAttr(wrapper, 'counter-display')
	expect(display.text()).toContain(counter + 1)
})

test('renders decrement button', () => {
	const wrapper = setup()
	const button = findByTestAttr(wrapper, 'decrement-button')
	expect(button.length).toBe(1)
})

test('decrement button decrements counter display', () => {
	const counter = 7
	const wrapper = setup(null, { counter })
	const button = findByTestAttr(wrapper, 'decrement-button')
	button.simulate('click')
	const display = findByTestAttr(wrapper, 'counter-display')
	expect(display.text()).toContain(counter - 1)
})

test('decrement button does not decrement below 0', () => {
	const wrapper = setup()
	const button = findByTestAttr(wrapper, 'decrement-button')
	button.simulate('click')
	const display = findByTestAttr(wrapper, 'counter-display')
	expect(display.text()).toContain(0)
})

test('decrementing lower than zero displays error', () => {
	const wrapper = setup()
	const button = findByTestAttr(wrapper, 'decrement-button')
	button.simulate('click')
	const error = findByTestAttr(wrapper, 'error-display')
	expect(error.length).toBe(1)
})

test('incrementing back up after displaying the error removes error', () => {
	const wrapper = setup()
	const decrementButton = findByTestAttr(wrapper, 'decrement-button')
	decrementButton.simulate('click')
	const incrementButton = findByTestAttr(wrapper, 'increment-button')
	incrementButton.simulate('click')
	const error = findByTestAttr(wrapper, 'error-display')
	expect(error.length).toBe(0)
})
