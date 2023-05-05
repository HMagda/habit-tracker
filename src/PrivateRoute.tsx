import {Outlet} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import {GetTokenSilentlyOptions, useAuth0} from '@auth0/auth0-react';
import TokenContext from './TokenContext';

const PrivateRoute = () => {
  const {token, setToken} = useContext(TokenContext);

  const {
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();

  const [authState, setAuthState] = useState(isAuthenticated);

  const getAccessTokenWithAudience = async () => {
    try {
      const options: GetTokenSilentlyOptions = {
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        },
      };

      return await getAccessTokenSilently(options);
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated) {
        if (token === undefined) {
          const fetchedToken = await getAccessTokenWithAudience();
          setToken(fetchedToken);
        }
      } else if (!isLoading) {
        console.log('Logging in...');
        const returnTo = window.location.pathname;
        loginWithRedirect({
          appState: {returnTo},
        });
      }
    };

    handleAuthentication();
  }, [isAuthenticated, isLoading, token]);

  if (isLoading) {
    return <div>Loading...</div>; // styling to be changed
  } else if (isAuthenticated) {
    return <Outlet />;
  } else {
    return null;
  }
};

export default PrivateRoute;
