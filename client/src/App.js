import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About.js';
import Games from './pages/GamesPage/GamesPage.js';
import Home from './pages/Home/Home.js';
import Layout from './components/Layout/Layout.js';
import Login from './components/Auth/Login.js';
import NotFound from './components/NotFound/NotFound.js';
import ProgressTracking from './components/ProgressTracking.js';
import Signup from './components/Auth/Signup.js';
import UserProfile from './pages/UserProfile/UserProfile.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')

  const handleLogin = () => {
    setIsLoggedIn(true)
  };

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('accessToken')
  };

  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={
            <Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              {isLoggedIn ? <Home /> : <Login handleLogin={handleLogin} />}
            </Layout>
          }
        >
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/progressTracking" element={<ProgressTracking />} />
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
