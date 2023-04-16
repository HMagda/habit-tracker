import React from 'react';
import './Navbar.modules.scss';
import Logo from '../../assets/short-black-logo.png';
import LoginButton from '../LoginButton/LoginButton ';
import LogoutButton from '../LogoutButton/LogoutButton ';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <img src={Logo} alt='Logo' className='logo' />
      </div>
      <div className='btns-container'>
      <LoginButton/>
      <LogoutButton/>
      </div>
    </div>
  );
};

export default Navbar;
