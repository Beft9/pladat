import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Profile.css';
import api from '../../services/api';
import ReactDOM from "react-dom"


import Nav from '../../pages/Navbar/Navbaremp';
import profilePhoto from '../../assets/anonymous.png';


let edit_popup = "none"

export default function Profile({ match }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function finduser() {
      const response = await api.get('/emps/profile', {
        headers: {
          userid: match.params.id,
        },
      });

      setUser(response.data);
    }

    finduser();
  }, [match.params.id]);


  return (


    <>
      <Nav userid={match.params.id} />
      <div className="main-container">
        <div className="profile-main"  style={{padding: '0px'}}>
          <h2 className="profile">Your Profile</h2>
          <div className="image-line" >
            <div className="image-div" style={{margin: '10px 10px 10px 20px'}}>
              <img src={profilePhoto} className="profile-images" />  {/*user.avatar*/}
            </div>
            <div className="image-side">
              <h1 className="profile">{user.name}</h1><br />
              <p className="user-infos">{user.name}</p>
            </div>
          </div>
          <div className="infos">
          </div><br />
          <div style={{ display: 'block' }}>
            <Link to={"/profileemp/" + match.params.id + "/edit"} >
              <p className="cancelbtn" style={{ backgroundColor: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)', color: 'white', padding: '12px 20px' }}>Edit Profile</p>
            </Link>
          </div>

        </div>
      </div>
      {/*ReactDOM.render(edit_user)*/}
    </>

  );
}
