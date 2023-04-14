import React from 'react';
import Tilt from 'react-parallax-tilt';
import sleepy from './sleepy.png';
import './logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
     <Tilt tiltMaxAngleX={35} tiltMaxAngleY={35} className='backgroundColor br2 shadow-2' style={{ height: '150px', width: '150px'}}>
        <div className='Tilt-inner pa3'>
            <img style={{paddingTop: '5px'}} alt='logo' src={sleepy}/>
        </div>
    </Tilt>
    </div>
  );
};

export default Logo;