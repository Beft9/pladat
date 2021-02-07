import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Navbar.css';


import logo from '../../assets/navbar_logo.png';

function Nav(props) {
  const NavStyle = ({
    color: 'white',
  });
  const userid = props.userid
  return (
    <nav>
      <Link to={"/emp/" + userid} style={{float: 'left',width: '30%'}}>
        <img src={logo} className="logo" alt="Pladat" />
      </Link>
      <ul className="nav-links">
        <Link style={NavStyle} to={"/profileemp/" + userid}>
          <li>Profile</li>
        </Link>
        <Link style={NavStyle} to={"/matchesEmp/" + userid}>
          <li>Matches</li>
        </Link>
        <Link style={NavStyle} to={"/browse/"+userid}>
          <li>Browse</li>
        </Link>
        <Link style={NavStyle} to="/">
          <li>Log Out</li>
        </Link>
    
      </ul>
    </nav>
   )
}
export default Nav;
