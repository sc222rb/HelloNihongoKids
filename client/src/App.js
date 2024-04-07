import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.js';
import LogIn from './components/Login.js';
import Signup from './components/Signup.js';
import ProgressTracking from './components/ProgressTracking.js';
import Home from './components/Home.js';
import About from './components/About.js';
import NoMatch from './components/NoMatch.js';

const App = () => {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<Signup />} />
            <Route path="progressTracking" element={<ProgressTracking />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App