import React, { useState } from 'react';

import './Login.css';
import { Link } from 'react-router-dom';

import Nav from '../../pages/Navbar/Navbar';
import student from '../../assets/student_icon.jpg';
import employer from '../../assets/employer_icon.png';

export default function Login() {
  return (
    <>
      <Nav />
      <div className="login-type-container">
        <div className="each">
          <img src={student} className="login-images" alt="Student" />
          <Link to="/login/student">
                  <p1 className="login-type-container-text">Login as a Student</p1>
          </Link>
        </div>
        <div className="each">
          <img src={employer} className="login-images" alt="Employer" />
          <Link to="/login/employer">
              <p1 className="login-type-container-text">Login as an Employer</p1>
          </Link>
        </div>
      </div>
    </>
  );
}
