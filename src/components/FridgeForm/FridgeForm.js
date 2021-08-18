import React, { Component } from 'react';

export default class FridgeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			description: '',
			date: '',
		};
	}
	addFridge = async (e) => {
		e.preventDefault();
		try {
			let jwt = localStorage.getItem('token');
			let fetchResponse = await fetch('/api/fridges', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + jwt,
				},
				body: JSON.stringify({
					name: this.state.name,
					address: this.state.address,
					lat: this.props.fridges.lat,
					lng: this.props.fridges.lng,
					time: this.props.fridges.time,
					date: this.state.date,
					description: this.state.description,
				}),
			});
			await fetchResponse.json();
			this.props.updateMarker({
				name: this.state.name,
				address: this.state.address,
				lat: this.props.fridges.lat,
				lng: this.props.fridges.lng,
				date: this.state.date,
				description: this.state.description,
			});
			this.setState({
				name: '',
				address: '',
				date: '',
				description: '',
			});
		} catch (err) {
			console.log('Error:', err);
		}
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<React.Fragment>
				<form>
					<input
						placeholder='Enter Your Company Name'
						type='text'
						name='name'
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<input
						placeholder='Enter Fridge Address'
						type='text'
						name='address'
						value={this.state.location}
						onChange={this.handleChange}
					/>
					<input
						placeholder='Enter Date of Food Drop Off'
						type='datetime-local'
						value={this.state.date}
						name='date'
						onChange={this.handleChange}
					/>
					<textarea
						placeholder='Enter Description of Food'
						type='text-area'
						name='description'
						value={this.state.description}
						onChange={this.handleChange}
					></textarea>
					<br></br>
					<button onClick={this.addFridge}>Add Fridge</button>
				</form>
			</React.Fragment>
		);
	}
}
