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
  const [skill, setSkill] = useState("Python");
  const [skills, setSkills] = useState([]);


  useEffect(() => {
    async function finduser() {
      const response = await api.get('/devs/profile',{
        headers: {
          user: match.params.id,
        },
      });

      setUser(response.data);
    }
    finduser();
    async function getskills() {
      const response = await api.get('/skills/getall', {});
      setSkills(response.data);
    }
    getskills();
  }, [match.params.id]);
    
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('/devs/addskill', null,{
      headers: {
        userid: match.params.id,
        skill: skill
      },
    });
    history.push("/profile/" + match.params.id);
  }


    return(
    <>
      <Nav userid={match.params.id}/>
        <div className="modal">
          <form className="modal-content animate" style={{height: '300px'}} onSubmit={handleSubmit}>
                <h2 style={{textAlign: 'center', margin: '10px', fontSize: '40px'}}>Add Skills</h2><br/> <br/>
  

                <div className="container">
              <div style={{width: '40%', margin: 'auto'}}>
              <label>
                <p style={{float: 'left', padding: '13px'}}>
                Pick Skill:
                </p>
                <select className="button" style={{float: 'right', margin: '0px', width: '120px', background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)'}} value={skill} onChange={e =>setSkill(e.target.value)}>
                  {skills.map(s => (
                    <option className="button" style={{color: 'black',background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)'}} key={s._id} value={s.name}>{s.name}</option>
                  ))}
                  
                </select>
              </label>
              </div><br/>
                    
                    <br/> <br/><br/><br/>
                <Link to={"/profile/" + match.params.id} className="button" style={{testAling: 'center', marginTop: '9px',width: '48%', backgroundColor: '#f44336', float: 'left'}}>
                    <p type="button" className="cancelbtn" >Cancel</p>
                </Link>
              <button type="submit" className="button is-success" style={{ width: '48%', float: 'right'}}>Add Skill</button>
                </div>
          </form>
        </div>
    </>
    )
}
