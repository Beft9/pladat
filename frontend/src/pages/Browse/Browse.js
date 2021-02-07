import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Browse.css';
import api from '../../services/api';

import logo from '../../assets/icon_logo.png';
import dislike from '../../assets/dislike.svg';
import like from '../../assets/tick.png';
import itsamatch from '../../assets/itsamatch.png';
import Nav from '../../pages/Navbar/Navbaremp';

export default function Browse({ match }) {
  const [students, setStudents] = useState([]);
  const [matchDev, setMatchDev] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    async function loadSelected() {
      const response = await api.get('/emps/profile', {
        headers: {
          userid: match.params.id,
        },
      });
      setSelected(response.data.selected);
      setLoading(false);
    }
    loadSelected();
  }, [match.params.id]);



  useEffect(() => {
    if (!loading) {
      async function loadStudents() {
        
        const response2 = await api.get('/devs', {
          headers: {
            user: selected,
          },
        });
        setStudents(response2.data);
      }

      loadStudents();

    }
  }, [loading]);


  useEffect(() => {
    if (!loading) {
      async function loadPlacementinfo() {

        const response = await api.get('/plas/placementfromid', {
          headers: {
            placementid: selected,
          },
        });
        await setInfo(response.data);
      }

      loadPlacementinfo();

    }
  }, [loading]);

  // useEffect se conecta com o socket.io

  async function handleLike(id) {
    await api.post(`/plas/${id}/likes`, null, {
      headers: { placementid: selected },
    });

    setStudents(students.filter(student => student._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/plas/${id}/dislikes`, null, {
      headers: { placementid: selected },
    });

    setStudents(students.filter(student => student._id !== id));
  }
  return (
    <>
      <Nav userid={match.params.id} />


      {info != undefined ? (
        <>
          
        <div className="main-container" style={{paddingTop: '20px'}}>
        <Link to="/" style={{width: '10%', float: 'left'}}>
            <img src={logo} className="logo" alt="Tindev" />
          </Link>
          <div style={{width: '80%', textAlign: 'left',  padding: '8px 0px 10px 20px',float: 'left'}}>
        <h1 style={{fontFamily: 'Helvetica', fontSize: '30px', color: 'black'}}>Currently selected placement: {info.name}</h1>
        </div><br/><br/>
        
          {students.length > 0 ? (
            <ul>
              
                <li key={students[0]._id}>
                  <img className="pp" src={students[0].avatar} alt={students[0].name} />
                  <footer>
                    <strong>{students[0].name}</strong>
                    <p>{students[0].bio}</p>
                    <p>Skills:</p>
                    {students[0].skills.map(s => (
                      <p>{s}</p>
                    ))}
                  </footer>

                  <div className="buttons">
                    <button type="button" onClick={() => handleDislike(students[0]._id)}>
                      <img src={dislike} alt="Dislike" />
                    </button>
                    <button type="button" onClick={() => handleLike(students[0]._id)}>
                      <img src={like} alt="Like" />
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
      ) : (<div className="main-container"><div className="empty">You should select a placement first!</div></div>)}
    </>
  );
}
