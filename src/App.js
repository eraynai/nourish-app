import './App.css';
import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import MapPage from './pages/MapPage/MapPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import InfoPage from './pages/InfoPage/InfoPage';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LoginForm from './components/LoginForm/LoginForm';
import Logo from './components/Logo/Logo';
import logo from './Static/assets/fridgeLogo.png';


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
							path='/home'
							render={(props) => (
								<Home {...props} user={this.state.user} /> 
							)}
						/>
						<Route
							path='/info'
							render={(props) => (
								<InfoPage {...props} user={this.state.user} /> 
							)}
						/>
						<Redirect to='/index' />
						<Nav setUserInState={this.setUserInState} />
					</Switch>
					
				) : (
					<div>
						<Switch>
							<Route
									path='/signup'
									render={(props) => (
										<SignUpForm {...props} user={this.state.user} />
									)}
								/>
								<Route
									path='/login'
									render={(props) => (
										<LoginForm {...props} user={this.state.user} /> 
									)}
								/>
						</Switch>
						<Logo pic={logo} />
						<Link class="link" exact to='/signup'>Sign Up</Link>
           				 &nbsp;&nbsp;&nbsp;
            			<Link class="link" exact to='/login'>Log In</Link>
            			&nbsp;&nbsp;&nbsp;
					</div>
				)}
			</React.Fragment>
		);
	}
}
