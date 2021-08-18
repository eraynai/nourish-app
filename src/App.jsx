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

	componentDidMount() {
		let token = localStorage.getItem('token')
		if (token) {
		  const payload = JSON.parse(atob(token.split('.')[1])); // decode token
		  if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
			localStorage.removeItem('token');
			token = null;
		  } else { // token not expired! our user is still 'logged in'. Put them into state.
			let userDoc = payload.user // grab user details from token
			this.setState({user: userDoc})      
		  }
		}
	  }

	render() {
		return (
		  <div className="App">
			{ this.state.user ? 
			  <div>
			  <Switch>
			
	
			  </Switch>
			  </div>
				:
			  <div>
			
			  <br />
			  <AuthPage setUserInState={this.setUserInState}/>
			  </div>
			}  
		  </div>
		)
	  }
	}
	