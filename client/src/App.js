import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/Game/Game.js';
import Home from './components/Home/Home.js';
import Layout from './components/Layout/Layout.js';
import Login from './components/Login/Login.js';
import NotFound from './components/NotFound/NotFound.js';
import Profile from './components/Profile/Profile.js';
import ProgressTracking from './components/ProgressTracking.js';
import Signup from './components/Signup/Signup.js';
import UpdateProfile from './components/UpdateProfile/UpdateProfile.js';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userId')
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
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
        <Route path="/game" element={<Game />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/user-update" element={<UpdateProfile />} />
        <Route path="/progressTracking" element={<ProgressTracking />} />
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
