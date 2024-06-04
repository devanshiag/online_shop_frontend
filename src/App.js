// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
// import keycloak from './auth/Keycloak';
// import PrivateRoute from './auth/PrivateRoute';
// import MainHeader from './components/MainHeader';
// import RegistrationForm from './components/RegistrationForm';
// import CustomerList from './components/CustomerList';
// import CustomerEdit from './components/CustomerEdit';
// import './App.css';

// const App = () => {
//   return (
//     <ReactKeycloakProvider authClient={keycloak}>
//       <Router>
//         <div className="app-container">
//           <MainHeader />
//           <div className="content">
//             <Routes>
//               <Route path="/" element={<RegistrationForm />} />
//               <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
//               <Route path="/customers/:id/edit" element={<PrivateRoute><CustomerEdit /></PrivateRoute>} />
//               {/* <Route path="/login" element={<Login />} /> */}
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     </ReactKeycloakProvider>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import initKeycloak from './Keycloak';
import MainHeader from './components/MainHeader';
import RegistrationForm from './components/RegistrationForm';
import CustomerList from './components/CustomerList';
import CustomerEdit from './components/CustomerEdit';
import { useState, useEffect } from 'react';
import PrivateRoute from './PrivateRoute';
import './App.css';
import { KeycloakContext } from './KeycloakContext';

const App = () => {
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const init = async () => {
      const instance = await initKeycloak();
      setKeycloak(instance);
    }
    init();
  }, []);

  if (!keycloak) {
    return <div>Loading...</div>; // Add a loading state while Keycloak is initializing
  }


return (
  
  <KeycloakContext.Provider value={keycloak}>
    <Router>
      <div className="app-container">
        <MainHeader />
        
        <div className="content">
          <Routes>
          <Route path="/register" element={<RegistrationForm />} />

            <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
            <Route path="/customers/:id/edit" element={<PrivateRoute><CustomerEdit /></PrivateRoute>} />
            {/* ... */}
          </Routes>
        </div>
      </div>
    </Router>
  </KeycloakContext.Provider>
  
);
};

export default App;
