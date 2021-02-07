import React, { useState } from 'react';

import './Signup.css';
import { Link } from 'react-router-dom';

import Nav from '../../pages/Navbar/Navbar';
import student from '../../assets/student_icon.jpg';
import employer from '../../assets/employer_icon.png';

export default function Signup() {
  return (
    <>
      <Nav />
      <div className="login-type-container">
        <div className="each">
          <img src={student} className="login-images" alt="Student" />
          <Link to="/signup/student">
                  <p1 className="login-type-container-text">Signup as a Student</p1>
          </Link>
        </div>
        <div className="each">
          <img src={employer} className="login-images" alt="Employer" />
          <Link to="/signup/employer">
              <p1 className="login-type-container-text">Signup as an Employer</p1>
          </Link>
        </div>
      </div>
    </>
  );
}
