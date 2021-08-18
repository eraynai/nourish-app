import React from 'react'
import './AuthPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default class AuthPage extends React.Component {
  state = {
    showLogin: true,
  }

  render() {
    return (
      <div className="AuthPage">        
        <div className="account-options">
          <div className="center-button">
          <button id="loginSignup" onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
            {this.state.showLogin ? 'SIGN UP' : 'LOG IN'}
          </button>
          {/* <p className="blurb">Have an account?Log in! Need an account? Sign Up</p> */}
          </div>          
        {/* Another ternary operator! */}
        {/* If showLogin is true, show the login form. If false, show the signup form */}
        {this.state.showLogin ? 
        <LoginForm setUserInState={this.props.setUserInState}/> : 
        <SignUpForm setUserInState={this.props.setUserInState} />}
</div>
      </div>
    );
  }
}