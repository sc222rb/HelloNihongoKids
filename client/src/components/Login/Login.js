import React, { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

/**
 * Layout component representing the overall layout of the application.
 * @param {Object} props - Props for the Layout component.
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in.
 * @returns {JSX.Element} Layout component
 */
const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

    /**
   * Handles form submission for user login.
   * @param {Event} e - Form submission event.
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
      if (response.status === 201) {
        const accessToken = response.data.access_token
        const userId = response.data.id
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('userId', userId)
        handleLogin() // Call handleLogin to update the isLoggedIn state
        navigate('/')
      } else {
        setError('Unexpected response. Please try again.')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid email or password. Please try again.')
        } else if (error.response.status === 500) {
          setError('Server error. Please try again later.')
        } else {
          setError('An error occurred. Please try again.')
        }
      } else if (error.request) {
        setError('Network error. Please check your internet connection and try again.')
      } else {
        setError('An error occurred. Please try again.')
      }
    }
  }

  return (
    <div className="col-md-4 mx-auto text-center">
      <h2>Log In</h2>
      <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{ margin: 'auto' }} />
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Type your Email here!"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><FontAwesomeIcon icon={faLock} /> Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="autoSizingCheck"
            className="mb-2"
            label="Remember me"
          />
          <div>
            <Link to='/' className="mb-3">Forgot Password?</Link>
          </div>
        </Form.Group>
        <div className="mb-3">
          <button type="submit">Log In</button>
        </div>
      </Form>
    </div>
  )
}

// Define propTypes for the Login component
Login.propTypes = {
  handleLogin: PropTypes.func.isRequired, // handleLogin prop is expected to be a function and is required
}

export default Login
