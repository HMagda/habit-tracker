import React from 'react';
import '../../styles/global.scss'
import {baseUrl} from "../../utils";

const LogoutButton = () => {
  const handleLogout = () => {
    window.location.href = baseUrl + '/logout'; // Redirect to your Ktor /logout route
  };

  return (
      <button className='logout-btn' onClick={handleLogout}>
        Log Out
      </button>
  );
};

export default LogoutButton;
