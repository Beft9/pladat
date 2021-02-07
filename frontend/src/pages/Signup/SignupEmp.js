import React, { useState } from 'react';

import './Signup.css';

import logo from '../../assets/icon_logo.png';

import api from '../../services/api';
import Nav from '../../pages/Navbar/Navbar';

export default function SignupStudent({ history }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/emps', {
      username,
      name,
      password,
    });

    const { _id } = response.data;

    history.push(`/emp/${_id}`);
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
            placeholder="Enter Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
