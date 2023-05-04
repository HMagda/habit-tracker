import {Outlet, useNavigate} from 'react-router-dom';
import React, {useContext, useEffect} from 'react';
import {GetTokenSilentlyOptions, useAuth0} from '@auth0/auth0-react';
import TokenContext from './TokenContext';

const PrivateRoute = () => {
    const { token, setToken } = useContext(TokenContext);


    const navigate = useNavigate();
    const {
      isAuthenticated,
      loginWithRedirect,
      getAccessTokenSilently,
      isLoading,
    } = useAuth0();

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
    if (!isAuthenticated && !isLoading) {
      console.log('Logging in...');
      const returnTo = window.location.pathname; 
      loginWithRedirect({
        appState: { returnTo }, 
      });
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (isAuthenticated && (token === undefined)) {
        (async () => {
            const fetchedToken = await getAccessTokenWithAudience();
            console.log('fetchedToken: ', fetchedToken)
            setToken(fetchedToken);
          })();
    }
  }, [isAuthenticated]);


  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isAuthenticated) {
    return <Outlet />;
  } else {
    return null; // Or some loading placeholder
  }
};

export default PrivateRoute;
