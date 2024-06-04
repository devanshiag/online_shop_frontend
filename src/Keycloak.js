import Keycloak from 'keycloak-js';

let keycloakInstance = null;

const initKeycloak = async () => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: 'http://localhost:8080', // Replace with your Keycloak server URL
      realm: 'online_shop_springboot', // Replace with your Keycloak realm
      clientId: 'react-app-auth', // Replace with your Keycloak client ID
      // pkceMethod: "S256",
      
    });

    try {
      await keycloakInstance.init({ onLoad: 'login-required',
      checkLoginIframe: false,
      redirectUri: window.location.origin,
      });

       
      
    } catch (error) {
      console.error('Error initializing Keycloak:', error);
      // Optionally, display an error message to the user
    }
  }
  return keycloakInstance;
};

export default initKeycloak;


