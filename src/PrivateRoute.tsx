import {Outlet} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

const PrivateRoute = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    isLoading,
  } = useAuth0();

  const [_, setAuthState] = useState(isAuthenticated);

  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleAuthentication = async () => {
       if (!isAuthenticated && !isLoading) {
        const returnTo = window.location.pathname;
        loginWithRedirect({
          appState: {returnTo},
        });
      }
    };

    handleAuthentication();
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <div className='loading-message'>Loading...</div>;
  } else if (isAuthenticated) {
    return <Outlet />;
  } else {
    return null;
  }
};

export default PrivateRoute;
