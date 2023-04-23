import React from 'react';
import '../../styles/global.scss'
import {baseUrl} from "../../utils";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = baseUrl + '/login'; // Redirect to your Ktor /login route
  };

  return (
      <button className='login-btn' onClick={handleLogin}>
        Log In
      </button>
  );
};

export default LoginButton;
