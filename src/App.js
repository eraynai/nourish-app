import './App.css';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import MapPage from './pages/MapPage/MapPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';


export default class App extends Component {
	state = {
		user: null,
	};

	setUserInState = (incomingUserData) => {
		this.setState({ user: incomingUserData });
	};

	componentDidMount() {
		let token = localStorage.getItem('token');
		if (token) {
			const payload = JSON.parse(atob(token.split('.')[1])); // decode token
			if (payload.exp < Date.now() / 1000) {
				// Check if our token is expired, and remove if it is (standard/boilerplate)
				localStorage.removeItem('token');
				token = null;
			} else {
				// token not expired! our user is still 'logged in'. Put them into state.
				let userDoc = payload.user; // grab user details from token
				this.setState({ user: userDoc });
			}
		}
	}

	render() {
		return (
			<React.Fragment>
				{/* <DonationPage /> */}
				{this.state.user ? (
					<Switch>
						<Route
							path='/index'
							render={(props) => (
								<MapPage {...props} user={this.state.user} />
							)}
						/>
						<Route
							path='/profile'
							render={(props) => (
								<ProfilePage {...props} user={this.state.user} />
							)}
						/>
						<Route
							path='/home'
							render={(props) => (
								<Home {...props} user={this.state.user} />
							)}
						/>

						<Redirect to='/index' />
						
						<Nav setUserInState={this.setUserInState} />
					</Switch>
					
				) : (
					<AuthPage setUserInState={this.setUserInState} />
				)}
			</React.Fragment>
		);
	}
}
