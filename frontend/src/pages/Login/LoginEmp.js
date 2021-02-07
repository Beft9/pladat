import React, { useState } from 'react';

import './Login.css';

import logo from '../../assets/icon_logo.png';

import api from '../../services/api';
import Nav from '../../pages/Navbar/Navbar';

export default function LoginStudent({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrong, setWrong] = useState('');
  
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.get('/emps/login', {

      headers: {
        username: username,
        password: password
      },
    });
    const user = response.data;
    if (user[0]) {
      const _id = user[0]._id;
      history.push(`/emp/${_id}`);
    }else {
      setWrong(true)
    }
  }

  return (
    <>
      <Nav />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <img src={logo} className="logo" alt="Tindev" />
          <input
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
          {wrong == true ? (
            <h1>Username does not exist or password is incorrect!</h1>
          ) :
            (<></>)
          }
        </form>
      </div>
    </>
  );
}
