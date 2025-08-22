import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain={"dev-cg6bd6y3gzvggvzl.us.auth0.com"}
    clientId={"nbBWHETn3qvUKGSI7tUVjxmEp5BcFGyr"}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation="localstorage"
    useRefreshTokens
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
