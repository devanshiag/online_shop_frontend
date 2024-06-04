import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainHeader.module.css'; // Create a CSS module for styling
import { KeycloakContext } from '../KeycloakContext';

const MainHeader = () => {
  const navigate = useNavigate();
  const keycloak = useContext(KeycloakContext);
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize state

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     setIsAuthenticated(keycloak.authenticated); // Update state based on keycloak
  //   };
  //   checkAuth();
  // }, [keycloak]); 

  const handleLogout = () => {
    keycloak.logout();
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Customer Management App</h1>
      </div>
      <nav className={styles.nav}>
        <button onClick={() => navigate('/register')} className={styles.button}>Register</button>
        <button onClick={() => navigate('/customers')} className={styles.button}>Customer List</button>
        <button onClick={() => navigate('/customer-detail')} className={styles.button}>Customer Detail</button>
        <button onClick={handleLogout} className={styles.button}>Logout</button>
        
        {/* {keycloak.authenticated && (
          <> 
            <button onClick={() => navigate('/customers')} className={styles.button}>
              Customer List
            </button>
            <button onClick={handleLogout} className={styles.button}>
              Logout
            </button>
          </>
        )} */}
        
      </nav>
    </header>
  );
};

export default MainHeader;
