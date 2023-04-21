import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/reset.local.css';

import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='shy-flower-0076.us.auth0.com'
      clientId='Egd6Vl4sLcaLaI2pcSKa2Cxt0wJBzXfL'
      // redirectUri={window.location.origin}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      // audience="your-auth0-api-audience" // Optional, if you have an API audience to use
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
