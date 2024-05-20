import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Game from './components/Game/Game.js'
import Home from './components/Home/Home.js'
import Layout from './components/Layout/Layout.js'
import Login from './components/Login/Login.js'
import Logout from './components/Logout/Logout.js'
import NotFound from './components/NotFound/NotFound.js'
import Profile from './components/Profile/Profile.js'
import Signup from './components/Signup/Signup.js'
import UpdateProfile from './components/UpdateProfile/UpdateProfile.js'


/**
 * The main App component that sets up routing for the application.
 * @returns {JSX.Element} The App component.
 */
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')

   /**
   * Handles user login by setting the isLoggedIn state to true.
   * @returns {void}
   */
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  /**
   * Handles user logout by setting the isLoggedIn state to false and
   * removing relevant data from localStorage.
   * @returns {void}
   */
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
        <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-update" element={<UpdateProfile />} />
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
