import React from 'react';
import '../../styles/global.scss'
import {baseUrl} from "../../utils";
import {useAuth0} from "@auth0/auth0-react";

const LoginButton = () => {

    const { loginWithRedirect } = useAuth0();

    const handleLogin = () => {
    window.location.href = baseUrl + '/login';
  };

    return (
        <button className='login-btn' onClick={() => loginWithRedirect()}>
            Log In
        </button>
    );

  // return (
  //     <button className='login-btn' onClick={handleLogin}>
  //       Log In
  //     </button>
  // );
};

export default LoginButton;
