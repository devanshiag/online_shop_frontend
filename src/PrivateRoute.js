import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { KeycloakContext } from './KeycloakContext';

// const PrivateRoute = ({ children }) => {
//   const keycloak = useContext(KeycloakContext);

//   return keycloak.authenticated ? children : <Navigate to="/" />;
// };
// const PrivateRoute = ({ children, roles = ['admin'] }) => {
//   const keycloak = useContext(KeycloakContext);

//   if (!keycloak.authenticated) {
//     return <Navigate to="/" replace />; // Redirect to login if not authenticated
//   }

//   const hasRequiredRole = roles.some((role) => keycloak.tokenParsed.realm_access.roles.includes(role));

//   if (!hasRequiredRole) {
//     return <div>unauthorized</div> // Redirect to unauthorized page if lacking role
//   }

//   return children;
// };

const PrivateRoute = ({ children, roles = [] }) => {
  const keycloak = useContext(KeycloakContext);

  if (!keycloak || !keycloak.authenticated) {
    keycloak.login();
    return null; // Render nothing while redirecting to login
  }

  const hasRequiredRole = roles.some((role) => keycloak.tokenParsed?.realm_access?.roles?.includes(role));

  if (!hasRequiredRole) {
    return <div>Unauthorized</div>; // Show unauthorized message if lacking role
  }

  return children;
};

export default PrivateRoute;
