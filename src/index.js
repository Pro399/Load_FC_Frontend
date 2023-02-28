import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
// const dotenv = require('dotenv').config()

// console.log(process.env.REACT_APP_AUTHDOMAIN);
// console.log(process.env.REACT_APP_CLIENT_ID);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      //  domain="dev-m8bq2k5h.us.auth0.com" //Sristhik
      //  clientId="gobBgoPZeWCdJxYCp68OfUsXH3zDAn3Q" //Sristhik
      //  redirectUri="http://localhost:3000/dashboard" 
      domain={`${process.env.REACT_APP_AUTHDOMAIN}`} //Pratyay
      clientId={`${process.env.REACT_APP_CLIENT_ID}`} //Pratyay
      redirectUri="http://localhost:3000/dashboard"
      cacheLocation='localstorage'>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
