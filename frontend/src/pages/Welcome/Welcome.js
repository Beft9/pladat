import React, { useState } from 'react';

import './Welcome.css';

import logo from '../../assets/icon_logo.png';

import api from '../../services/api';
import Nav from '../../pages/Navbar/Navbar';

export default function Welcome({ history }) {
  return (
    <>
      <Nav />
      <div className="welcome">
      <main>
            <div class="box">
                <img src={logo} className="photo" alt="Tindev" />
                <h2>What do we promise?</h2>
                <p>Placements with employers play a valuable role in the learning journey for software engineering and computing students. Placement students are paid a salary and benefit from support and mentoring towards working on live production projects. Different terminology is used in different countries. Placements are sometimes called “paid internships” or “work experience.” </p>
                <p>Placements can benefit employers by helping existing staff members develop their mentoring and management skills, providing an improved recruitment pipeline for graduate vacancies, giving extra resources to projects and helping to offer imaginative new ideas and supporting partnership building with Universities.</p>
                <p>Placement students are paid a modest salary but benefit from support and mentoring towards working on live production projects. Placement students gain first-hand experience of working on commercial projects. The daily interactions with practitioners help students gain valuable professional and technical skills. </p>
            </div>
        </main>
      </div>
    </>
  );
}
