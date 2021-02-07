import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import api from '../../services/api';

import logo from '../../assets/icon_logo.png';
import dislike from '../../assets/dislike.svg';
import like from '../../assets/tick.png';
import itsamatch from '../../assets/itsamatch.png';
import Nav from '../../pages/Navbar/Navbarlogged';

export default function Main({ match }) {
  const [placements, setPlacements] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadPlacements() {
      const response2 = await api.get('/plas', {
        headers: {
          user: match.params.id,
        },
      });

      setPlacements(response2.data);
    }

    loadPlacements();
  }, [match.params.id]);

  // useEffect se conecta com o socket.io
  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id },
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    });

    setPlacements(placements.filter(placement => placement._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });

    setPlacements(placements.filter(placement => placement._id !== id));
  }
  const userid = match.params.id;
  console.log(placements);
  return (
    <>
      <Nav userid={userid} />
      <div className="main-container">
        <Link to="/">
          <img src={logo} className="logo" alt="Tindev" />
        </Link>

        {placements.length > 0 ? (
          <ul>
              <li key={placements[0]._id}>
              <img className="pp" src={placements[0].avatar} alt={placements[0].name} />
                <footer>
                <strong>{placements[0].name}</strong>
                <p>{placements[0].info}</p>
                  <p>Requirements:</p>
                {placements[0].skills.map(s => (
                    <p>{s}</p>
                  ))
                    }
                </footer>

                <div className="buttons">
                <button type="button" onClick={() => handleDislike(placements[0]._id)}>
                    <img src={dislike} alt="Delete"/>
                  </button>
                <button type="button" onClick={() => handleLike(placements[0]._id)}>
                    <img src={like} alt="Apply" />
                  </button>
                </div>
              </li>
          </ul>
        ) : (
            <div className="empty">Empty!</div>
          )}

        {matchDev && (
          <div className="match-container">
            <img src={itsamatch} alt="It's a match" />

            <img className="avatar" src={matchDev.avatar} alt="" />
            <strong>{matchDev.name}</strong>
            <p>{matchDev.bio}</p>

            <button type="button" onClick={() => setMatchDev(null)}>
              GREAT
          </button>
          </div>
        )}
      </div>
    </>
  );
}
