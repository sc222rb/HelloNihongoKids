import React from 'react'
import './About.css'

/**
 * About component displaying information about the Memory Game Application.
 * @returns {JSX.Element} About component.
 */
const About = () => {
  return (
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <h2>About</h2>
            <p>Welcome to the Hello Nihongo Kids app! This application is designed to help kids learn Japanese Hiragana and Katakana in a fun way.</p>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-8">
            <h3>How to Use the Application</h3>
            <ol>
              <li>
                <strong>Sign Up/Login:</strong>
                <ul>
                  <li>If you're a new user, click on the "Sign Up" button and fill in the required details to create an account.</li>
                  <li>If you're an existing user, click on the "Log In" button and enter your credentials to log in to your account.</li>
                </ul>
              </li>
              <li>
                <strong>Gameplay:</strong>
                <ul>
                  <li>Click on the "Game" link in the navigation menu to start playing the Memory Game.</li>
                  <li>Flip pairs of cards to find matching pairs.</li>
                  <li>The game ends when all pairs have been matched.</li>
                </ul>
              </li>
              <li>
                <strong>Profile:</strong>
                <ul>
                  <li>Click on the "Profile" link in the navigation menu to view your profile.</li>
                  <li>In your profile, you can view your username, email, and top 5 games with the lowest number of turns.</li>
                </ul>
              </li>
              <li>
                <strong>Update Profile:</strong>
                <ul>
                  <li>In your profile, click on the "Update Profile" button to update your username, email, password, or avatar.</li>
                </ul>
              </li>
              <li>
                <strong>Logout:</strong>
                <ul>
                  <li>To log out of your account, click on the "Log Out" button in the navigation menu.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
  )
}

export default About
