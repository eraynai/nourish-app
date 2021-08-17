import './App.css';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import DonationPage from './pages/DonationPage/DonationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

export default class App extends Component {
	state = {
		user: null,
	};

	setUserInState = (incomingUserData) => {
		this.setState({ user: incomingUserData });
	};

	render() {
		return (
			<React.Fragment>
				<DonationPage />
				{/* {this.state.user ? (
					<Switch>
						<Route
							path='/index'
							render={(props) => (
								<DonationPage {...props} user={this.state.user} />
							)}
						/>
						<Route
							path='/profile'
							render={(props) => (
								<ProfilePage {...props} user={this.state.user} />
							)}
						/>
						<Redirect to='/index' />
					</Switch>
				) : (
					<AuthPage setUserInState={this.setUserInState} />
				)} */}
			</React.Fragment>
		);
	}
}
