import React from 'react';
import './Navbar.modules.scss';
import Logo from '../../assets/short-black-logo.png';
import LoginButton from '../LoginButton/LoginButton ';
import LogoutButton from '../LogoutButton/LogoutButton ';
import {Link} from 'react-router-dom';

import {useAuth0} from '@auth0/auth0-react';

const Navbar = () => {
  const {isAuthenticated} = useAuth0();

  return (
    <div className='navbar'>
      <Link to='/'>
        <div className='logo-container'>
          <img src={Logo} alt='Logo' className='logo' />
        </div>
      </Link>
      <div className='btns-container'>
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
      </div>
    </div>
  );
};

export default Navbar;
