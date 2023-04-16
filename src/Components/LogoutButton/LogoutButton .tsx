import React from 'react';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';
import '../../styles/global.scss'

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
    className='logout-btn'
      onClick={() =>
        logout({ returnTo: window.location.origin } as LogoutOptions)
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
