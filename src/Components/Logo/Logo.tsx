import React from 'react';
import './Logo.modules.scss';
import Logo from '../../assets/short-black-logo.png';

const Navbar = () => {
  return (
    <div className='logo-container'>
      <img src={Logo} alt='Logo' className='logo' />
    </div>
  );
};

export default Navbar;
