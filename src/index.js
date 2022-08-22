import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';

// domain - dev-cbze-cz1.eu.auth0.com
// clientID - leBZhiuyFYFOtWQtVOJ1LD1HW2O32BNR

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-cbze-cz1.eu.auth0.com"
    clientId="leBZhiuyFYFOtWQtVOJ1LD1HW2O32BNR"
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <GithubProvider>
      <App />
    </GithubProvider>
  </Auth0Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
