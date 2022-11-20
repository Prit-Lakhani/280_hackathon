// import axios from 'axios';
import React from 'react';
import Navbar from './navbar';
import background from '../facets.png';

const Landing = () => (
  <>
    <div
      style={{
        width: '100%',
        height: '80rem',
        padding: '0',
        margin: '0',
        backgroundImage: `url(${background})`,
      }}
    >
      <Navbar colour="FFFFFF" textColour="5BC5A7" />
    </div>
  </>
);

export default Landing;
