// import './UserLogOut.css';
import React from 'react';
import LogOut from '../../Static/assets/logout.svg';
import './UserLogOut.css';


export default function UserLogOut(props) {
  return (
    <div className="UserLogOut">
      {/* <div>{user.name}</div>
      <div className="email">{user.email}</div> */}
      <img src={LogOut} alt="logout icon" className="logout" id="btn" onClick={props.handleLogOut} />
    </div>
  );
}
