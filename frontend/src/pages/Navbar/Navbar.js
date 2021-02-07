import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Navbar.css';


import logo from '../../assets/navbar_logo.png';

function Nav() {

  return (
    <nav>
        <Link to="/" style={{float: 'left',width: '30%'}}>
          <img src={logo} className="logo" alt="Pladat" />
        </Link>
      <ul className="nav-links">
        <Link style={{color: 'white'}} to="/signup">
          <li>Signup</li>
        </Link>
        <Link style={{color: 'white'}} to="/login">
          <li>Login</li>
        </Link>
      </ul>
    </nav>
   )
}
export default Nav;
