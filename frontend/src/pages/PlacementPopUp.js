import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Main/popup.css';

export default function PopUp (props) {

  const [info, setInfo] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [req1, setReq1] = useState('Python');
  const [req2, setReq2] = useState('Python');
  const [req3, setReq3] = useState('Python');
  const [skills, setSkills] = useState('');
  const userid = props.userid


  useEffect(() => {
    async function fetchallskills() {
      const response = await api.get('/skills/getall', {});
      setSkills(response.data);
      setLoading(false);
    }

    fetchallskills();
  },[loading]);


  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('/plas', {
        name,
        info,
        image,
        employer: userid,
        req1,
        req2,
        req3,

    });
    const placement = response.data;

    const response2 = await api.post('/emps/pplacement', {
      employerid:userid,
      placementid:placement._id,
    });
    props.toggle();
  }
  return (

  <>
    {
      loading ? (null): (
          <div className="modal">
            <div className="modal-content">
              <h1 className="popup-header">Add Placement</h1>
              <span className="close" onClick={() => {
                props.toggle();
              }
              }>
                &times;
          </span>
              <div>
                <form onSubmit={handleSubmit}>
                  {/*<input
                type="file"
                className="popup-image"
                placeholder="Enter Image"
                value={image}
                onChange={e => setImage(e.target.value)}
              />*/}
                  <input
                    className="popup-image"
                    placeholder="Enter Image url"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                  <br />
                  <input
                    className="popup"
                    placeholder="Enter Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  /><br />
                  <input
                    className="popup"
                    placeholder="Enter Info"
                    value={info}
                    onChange={e => setInfo(e.target.value)}
                  />
                  <br />
                  <h2>Requirements</h2>
                  <select className="button" style={{ float: 'right', margin: '0px', width: '120px', background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)' }} value={req1} onChange={e => setReq1(e.target.value)}>
                    {skills.map(s => (
                      <option className="button" style={{ color: 'black', background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)' }} key={s._id} value={s.name}>{s.name}</option>
                    ))}

                  </select>
                  <br />
                  <select className="button" style={{ float: 'right', margin: '0px', width: '120px', background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)' }} value={req2} onChange={e => setReq2(e.target.value)}>
                    {skills.map(s => (
                      <option className="button" style={{ color: 'black', background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)' }} key={s._id} value={s.name}>{s.name}</option>
                    ))}

                  </select>
                  <br />
                  <select className="button" style={{ float: 'right', margin: '0px', width: '120px', background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)' }} value={req3} onChange={e => setReq3(e.target.value)}>
                    {skills.map(s => (
                      <option className="button" style={{ color: 'black', background: 'linear-gradient(0.25turn, #fd297b, #ff5864, #ff655b)' }} key={s._id} value={s.name}>{s.name}</option>
                    ))}

                  </select>

                  <br />
                  <input type="submit" className="button is-success" />
                </form>
              </div>

            </div>
          </div>

      )
      
      }
      </>
      
    );
}
