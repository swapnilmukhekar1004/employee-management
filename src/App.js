


import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
  
} from "react-router-dom";


import Dashboard from "./Components/pages/dashboard";
import CreateProject from "./Components/pages/createproject";
import Projectlisting from "./Components/pages/projectlisting";
import Layout from "./Components/layout";

const App = () => {
 

  return (
    <AuthenticatedRoutes />
  );
};

const AuthenticatedRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="createProject" element={<CreateProject />} />
            <Route path="projectListing" element={<Projectlisting />} />
          </Route>
        
        </Routes>
      </Router>
    </>
  );
};

export default App;
