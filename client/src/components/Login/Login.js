import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Login ...')
    console.log('Email:', email)
    console.log('Password:', password)

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
        <div className="col-md-6 mx-auto">
            <h2 className="text-center">Log In</h2>
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
                        <Link to='/' className="text-center mb-3">Forgot Password?</Link>
                    </div>
                </Form.Group>
                <div className="text-center mb-3">
                    <Button variant="primary" type="submit">Log In</Button>
                </div>
            </Form>
        </div>
  )
}

export default Login
