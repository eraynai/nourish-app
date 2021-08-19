import './Nav.css';
import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import UserLogOut from '../UserLogOut/UserLogOut';
import AuthPage from '../../pages/AuthPage/AuthPage';
import history from "../../history";
import Home from '../HomePic/HomePic';
import home from '../../Static/assets/home.png';
import InfoPic from '../InfoPic/InfoPic';
import infoPic from '../../Static/assets/info.png';
import MapPic from '../MapPic/MapPic';
import mapPic from '../../Static/assets/map.png';
// export default function nav(loc) {
//   history.push(loc);
// }

export default class Nav extends React.Component {
  state ={
    isLoggedIn: true,
    user: null,
  };

  handleLogOut = (e) => {
    e.preventDefault()
    console.log('logout clicked')
    let token = localStorage.getItem('token')
    token = null
    localStorage.removeItem('token')
    history.push('/');
    this.props.setUserInState(null)
    this.setState({
      user: null,
      isLoggedIn: false,
    })
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
      } else { // token not expired! our user is still 'logged in'. Put them into state.
        let userDoc = payload.user // grab user details from token
        console.log("userDoc", userDoc)
        this.setState({
          user: userDoc,
          isLoggedIn: true,
        })      
      }

    }
  }

  render() {
    return (
      <div>
        {this.state.user ? 
        <nav className="Nav">
          <div className="nav-container">
            <Link class="link" exact to='/home'><Home pic={home} /></Link>
            &nbsp;&nbsp;&nbsp;
            <Link class="link" exact to='/map'><MapPic pic={mapPic} /></Link>
            &nbsp;&nbsp;&nbsp;
            <Link class="link" exact to='/info'><InfoPic pic={infoPic} /></Link>
            &nbsp;&nbsp;&nbsp;
            <Link class="link" exact to='/'>
            <UserLogOut class="logout-button"
              handleLogOut={this.handleLogOut}
            />
            </Link>
          </div>
        </nav>
        :
        <AuthPage setUserInState={this.setUserInState}/>
        } 
      </div>
    )
  }
}