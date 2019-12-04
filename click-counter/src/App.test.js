import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App'

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders without crashing', () => {
	const wrapper = shallow(<App />)
	const appComponent = wrapper.find("[data-test='component-app']")
	expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {})

test('renders counter display', () => {})

test('counter starts at 0', () => {})

test('renders clicking button increments counter display', () => {})
