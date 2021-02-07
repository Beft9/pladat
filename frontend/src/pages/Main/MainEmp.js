import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import api from '../../services/api';

import logo from '../../assets/icon_logo.png';
import Delete from '../../assets/delete.png';
import Select from '../../assets/select.png';
import itsamatch from '../../assets/itsamatch.png';
import Nav from '../../pages/Navbar/Navbaremp';
import PlacementPopUp from '../../pages/PlacementPopUp';


export default function Main({ match, history }) {
  var plas = [];
  const userid = match.params.id;
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [seen, setSeen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    async function fetchuser() {
      const response = await api.get('/emps/profile', {
        headers: {
          userid: match.params.id,
        },
      });
      setUser(response.data);
      setFetching(false);
    }
    fetchuser();
  }, [match.params.id]);

  useEffect(() => {
    if (!fetching) {
      async function fetchplacements() {

        
        const ids = user.placements;
        console.log(ids);
        const response = await api.get('/plas/findpla', {
          headers: {
            user: match.params.id,
          },
        });
        console.log(response.data);
        setPlacements(response.data);
        setLoading(false);

      }
      fetchplacements();
    }
  }, [fetching, match.params.id]);

  useEffect(() => {
    if (!loading) {
      console.log(placements);
    }
  }, [loading, match.params.id]);

  async function handleDelete(id) {
    await api.post(`/emps/deleteplacement`, null, {
      headers: {
        placementid: id,
        userid: match.params.id
      },
    });
    console.log("Delete")
    setPlacements(placements.filter(placement => placement._id !== id));
  }



  async function handleSelect(id) {
    await api.post(`/emps/setselected`, null, {
      headers: {
        placementid: id,
        userid: match.params.id
      },
    });
    setSelected(id);
    console.log("Select")
  }

  return (
    <>
    {loading ? (
        <>
          <Nav userid={userid} />
          <div className="main-container">
            <h3>Loading</h3>

          </div>
        </>
      ) : (
        <>
          <Nav userid={userid} />
          <div className="main-container">
            <h3>Your Placements</h3>
              {placements ? (
                <>
                  <h3>{plas}</h3>
                  <ul>
                    {placements.map(placement => (

                      placement._id == selected ? (
                        <li key={placement._id}>
                          <img className="pp" src={placement.avatar} alt={placement.name} />
                          <footer>
                            <strong>{placement.name}(Selected)</strong>
                            <p>{placement.info}</p>
                            <p>Requirements:</p>
                            {placement.skills.map(s => (
                              <p>{s}</p>
                            ))
                            }
                          </footer>
                          <div className="buttons">
                            <button type="button" onClick={() => handleDelete(placement._id)}>
                              <img src={Delete} alt="Delete" />
                            </button>
                            <button type="button" onClick={() => handleSelect(placement._id)} >
                              <img src={Select} alt="Select" />
                            </button>
                          </div>

                        </li>



                      ) : (<li key={placement._id}>
                          <img className="pp" src={placement.avatar} alt={placement.name} />
                        <footer>
                          <strong>{placement.name}</strong>
                            <p>{placement.info}</p>
                            <p>Requirements:</p>
                            {placement.skills.map(s => (
                              <p>{s}</p>
                            ))
                            }
                        </footer>
                        <div className="buttons">
                          <button type="button" onClick={() => handleDelete(placement._id)}>
                            <img src={Delete} alt="Delete" />
                          </button>
                          <button type="button" onClick={() => handleSelect(placement._id)} >
                            <img src={Select} alt="Select" />
                          </button>
                        </div>

                        </li>)

                      ))}
                  </ul>
                </>

            ) : null}
            <div>
              <div type="submit" onClick={() => { setSeen(!seen) }}>
                <button style={{width: '25%', background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)'}}>Create Placement</button>
              </div>
              {!seen ? <PlacementPopUp userid={userid} toggle={() => {
                setSeen(!seen);
              }
              } /> : null}
            </div>

          </div>
        </>)
      }
      </>
  );
}
