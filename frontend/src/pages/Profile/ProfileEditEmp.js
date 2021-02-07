import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import profilePhoto from '../../assets/anonymous.png';
import './Profile.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ReactDOM from "react-dom"
import Nav from '../../pages/Navbar/Navbarlogged';
const div_id = ("id01")



export default function ProfileEdit({ match, history }) {
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
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
    

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/emps/updatep', {
      userid: match.params.id,
      username,
      name,
    });

    const { _id } = response.data;

    history.push(`/emp/${_id}`);
  }


    return(
    <>
      <Nav userid={match.params.id}/>
        <div className="modal">
          <form className="modal-content animate" onSubmit={handleSubmit}>
                <h2 style={{textAlign: 'center', margin: '10px', fontSize: '40px'}}>Edit Profile</h2>
                <div className="imgcontainer">
                    <img src={profilePhoto} style={{width: '35%', marginTop: '30px', marginLeft: 'auto', marginRight: 'auto'}}/>
                </div>

                <div className="container">
                    <label for="uname"><b>Username</b></label>
                    <div className="field">
                        <p className="control">
                  <input onChange={e => setUsername(e.target.value)} className="input" type="text" placeholder={user.username}/>
                        </p>
                    </div>

                    <label for="psw"><b>Name</b></label>
                    <div className="field">
                        <p className="control">
                  <input onChange={e => setName(e.target.value)} className="input" type="text" placeholder={user.name}/>
                        </p>
                    </div>
                    <br/>

                    <Link to={"/profileemp/" + match.params.id} className="button" style={{testAling: 'center', marginTop: '8px',width: '48%', backgroundColor: '#f44336', float: 'left'}}>
                        <p type="button" className="cancelbtn" >Cancel</p>
                    </Link>
                    <button type="submit" className="button is-success" style={{width: '48%'}}>Save</button>
                </div> 
            </form>
        </div>
    </>
    )
}
