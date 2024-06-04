import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { KeycloakContext } from './KeycloakContext';

const PrivateRoute = ({ children }) => {
  const keycloak = useContext(KeycloakContext);

  return keycloak.authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
