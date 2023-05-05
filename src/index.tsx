import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.local.css';
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      cacheLocation='localstorage'
      useRefreshTokens={true}
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: window.location.origin + '/habits',
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
