import React, { useState, useEffect } from 'react';

import './Skills.css';

import logo from '../../assets/icon_logo.png';

import api from '../../services/api';
import Nav from '../../pages/Navbar/Navbar';

export default function AddSkills({ history }) {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/skills', {
      name,
    });

    const { _id } = response.data;
  }

  useEffect(() => {
    async function fetchallskills() {
      const response = await api.get('/skills/getall', {});
      setSkills(response.data);
      setLoading(false);
    }

    fetchallskills();
  }, [loading]);


  return (
    <>
      <Nav />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <img src={logo} className="logo" alt="Tindev" />
          <input
            placeholder="Enter Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>


      {skills.length > 0 ? (
        <ul>
          {skills.map(skill => (
            <li key={skill._id}>
              <footer>
                <strong>{skill.name}</strong>
              </footer>
            </li>
          ))}
        </ul>
      ) : (
          <div className="empty">Empty!</div>
        )}
    </>
  );
}
