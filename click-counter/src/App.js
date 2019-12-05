import React, { Component } from 'react'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			counter: 0,
			error: false,
		}
	}

	decrement = () => {
		if (this.state.counter > 0) this.setState({ counter: this.state.counter - 1 })
		else this.setState({ error: true })
	}

	getErrorDisplay = () => {
		if (this.state.error) {
			return <h3 data-test="error-display"> Cannot decrement lower than 0 !</h3>
		}
	}

	render() {
		return (
			<div data-test="component-app">
				<h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
				{this.getErrorDisplay()}
				<button
					data-test="increment-button"
					onClick={() => this.setState({ counter: this.state.counter + 1, error: false })}
				>
					Increment!
				</button>
				<button data-test="decrement-button" onClick={this.decrement}>
					Decrement!
				</button>
			</div>
		)
	}
}

export default App
