import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = '/habits';
  };

  return (
    <button className='login-btn' onClick={() => handleLogin()}>
      Log In
    </button>
  );
};

export default LoginButton;
