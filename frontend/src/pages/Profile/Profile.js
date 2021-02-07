import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Profile.css';
import api from '../../services/api';
import ReactDOM from "react-dom"


import Nav from '../../pages/Navbar/Navbarlogged';
import profilePhoto from '../../assets/anonymous.png';


let edit_popup = "none"

export default function Profile({ match }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function finduser() {
      const response = await api.get('/devs/profile', {
        headers: {
          user: match.params.id,
        },
      });

      setUser(response.data);
    }

    finduser();
  }, [match.params.id]);

    console.log(user)

  async function handleRemove(s) {
    await api.post(`/devs/removeskill`, null, {
      headers: {
        userid: match.params.id,
        skill: s,
      },
    });

    
  }


  return (
    

    <>
      <Nav userid={match.params.id}/>
      <div className="main-container">
        <div className="profile-main" style={{padding: '0px', height: 'auto'}}>
        <h2 className="profile">Your Profile</h2>
          <div className="image-line" style={{display: 'block', float: 'left', marginBottom: '20px'}}>
            <div className="image-div" style={{margin: '10px 10px 10px 20px'}}>
              <img src={profilePhoto} className="profile-images"/>  {/*user.avatar*/} 
            </div>
            <div className="image-side">
              <h1 className="profile">{user.name}</h1><br/>
              <p className="title">Education:  </p>
              <p className="user-infos">{user.bio}</p>
            </div>
          </div>
          <div style={{width: '100%', textAlign: 'left'}}>
          <h2 style={{margin: '2px 0px 0px 50px', float: 'left'}}>Skills:</h2>
          {user.skills ? (
            <ul style={{float: 'left'}}>
              {user.skills.map(s => (
                <li key={s}>
                  <footer>
                    <strong>{s}</strong>
                  </footer>
                  <button type="button" onClick={() => handleRemove(s)}>
                    Remove Skill
                </button>
                </li>
             
              ))}
            </ul>
          ) : (
              <div className="empty">Empty!</div>
            )}</div>
          <div className="infos">
          </div><br/>
         <div style={{textAlign: 'center', float: 'center', margin: 'auto'}}>
           <div style={{textAlign: 'center', margin: 'auto', width: '224px'}}>
            <Link to={"/profile/"+match.params.id + "/edit"} style={{float: 'left', padding: '0px', width: '112px', margin: 'auto'}} >
              <div>
              <p className="cancelbtn" style={{backgroundColor: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)', color: 'white', padding: '12px 12px'}}>Edit Profile</p>
              </div>
            </Link>
          
            <Link to={"/profile/" + match.params.id + "/skills"} style={{margin: '0px', padding: '0px', width: '112px'}} >
              <p className="cancelbtn" style={{backgroundColor: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)', color: 'white', padding: '12px 12px' }}>Add Skills</p>
            </Link>
            </div><br/>
          </div>
        </div>     
      </div>
      {/*ReactDOM.render(edit_user)*/}  
    </>

  );
}
