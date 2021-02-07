import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Matches.css';
import api from '../../services/api';


import Nav from '../../pages/Navbar/Navbaremp';
export default function Matches({ match }) {

  const [matches, setMatches] = useState([]);
  useEffect(() => {
    async function listmatches() {
      const response = await api.get('/plas/matches', {
        headers: {
          employerid: match.params.id,
        },
      });

      setMatches(response.data);
    }

    listmatches();
  }, [match.params.id]);
  console.log(matches);

  return (
    <>
      <Nav userid={match.params.id}/>
      <div className="main-container">
        <h3>Matches</h3>
        <ul>
          {matches.map(profile => (
            <li key={profile._id}>
              <img className="pp" src={profile.avatar} alt={profile.name} />
              <footer>
                <strong>{profile.name}</strong>
                <p>{profile.bio}</p>
                <p>Skills:</p>
                {profile.skills.map(s => (
                  <p>{s}</p>
                ))}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </>

  );
}
