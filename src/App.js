import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.js';
import CreatePortfolio from './components/CreatePortfolio/CreatePortfolio.js';
import Registration from './components/Registration/Registration.js';
import Login from './components/Login/Login.js';
import Test from './components/Test.js';
import { useState, useEffect } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createportfolio" element={<CreatePortfolio />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
