import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faHippo, faSpider, faHorseHead, faDragon, faDove } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const avatarOptions = [
    { value: 'faHippo', label: 'faHippo', icon: faHippo },
    { value: 'faSpider', label: 'faSpider', icon: faSpider },
    { value: 'faHorseHead', label: 'faHorseHead', icon: faHorseHead },
    { value: 'faDragon', label: 'faDragon', icon: faDragon },
    { value: 'faDove', label: 'faDove', icon: faDove }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('Submitting form...')
    console.log('username:', username)
    console.log('Email:', email)
    console.log('Password:', password)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, email, password })
      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Unexpected response. Please try again.')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setError('Email already exists. Please choose a different email.')
        } else if (error.response.status === 422) {
          setError('Invalid data. Please check your inputs and try again.')
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
      <h2 className="text-center mb-4">Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><FontAwesomeIcon icon={faUser} /> Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="What is the child's name?"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
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
          <Form.Label>Choose Avatar</Form.Label>
          <div className="d-flex flex-wrap">
            {avatarOptions.map(option => (
              <button key={option.value} className="me-3 mb-3" style={{ cursor: 'pointer' }} onClick={() => setAvatar(option.value)}>
                <FontAwesomeIcon icon={option.icon} size="3x" color={avatar === option.value ? 'blue' : 'gray'} />
              </button>
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  )
}

export default Signup
