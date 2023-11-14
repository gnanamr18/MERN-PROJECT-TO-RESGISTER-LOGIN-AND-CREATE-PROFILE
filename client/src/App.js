import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";
// Redux
import{Provider} from 'react-redux'
import Store from "./Store";

const App = () => {
  return (
    
      <Provider Store ={Store}>
        <Router>
          <Fragment>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register"  element={<div className="container"> <Register /> </div>} />   
              <Route path="/login" element={<div className="container"> <Login /> </div>} />
            </Routes>
          </Fragment>
        </Router>
      </Provider>
  );
};

export default App;
