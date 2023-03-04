import React from 'react';
import './Navbar.modules.scss';
import Logo from '../../assets/short-black-logo.png';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <img src={Logo} alt='Logo' className='logo' />
      </div>
    </div>
  );
};

export default Navbar;
