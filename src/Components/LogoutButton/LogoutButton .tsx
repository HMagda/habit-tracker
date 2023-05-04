import React from 'react';
import '../../styles/global.scss'
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();


  return (
    // TODO add redirect uri to logout
      <button className='logout-btn' onClick={() => logout()}> 
        Log Out
      </button>
  );
};

export default LogoutButton;
