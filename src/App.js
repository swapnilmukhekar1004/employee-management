


import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
  
} from "react-router-dom";


import CreateEmp from "./Components/pages/createEmp";
import Emplisting from "./Components/pages/emplisting";
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
          
            <Route path="Create-Employee"  element={<CreateEmp />} />
            <Route  index  element={<Emplisting />} />
          </Route>
        
        </Routes>
      </Router>
    </>
  );
};

export default App;
