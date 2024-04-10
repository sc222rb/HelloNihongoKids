import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About.js';
import Games from './components/Games.js';
import Home from './components/Home.js';
import Layout from './components/Layout.js';
import LogIn from './components/Login.js';
import NoMatch from './components/NoMatch.js';
import ProgressTracking from './components/ProgressTracking.js';
import Signup from './components/Signup.js';
import UserProfile from './components/UserProfile.js';


const App = () => {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="games" element={<Games />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<Signup />} />
            <Route path="userProfile" element={<UserProfile />} />
            <Route path="progressTracking" element={<ProgressTracking />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App