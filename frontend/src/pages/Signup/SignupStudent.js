import React, { useState } from 'react';

import './Signup.css';

import logo from '../../assets/icon_logo.png';

import api from '../../services/api';
import Nav from '../../pages/Navbar/Navbar';

export default function SignupStudent({ history }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [education, setEducation] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      username,
      name,
      password,
      image,
      education,
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
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
          <input
            placeholder="Enter Link for Profile Picture"
            value={image}
            onChange={e => setImage(e.target.value)}
            defaultValue={"https://i.imgur.com/tdi3NGa.png"}
          />
          <input
            placeholder="Enter School and GPA"
            value={education}
            onChange={e => setEducation(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
