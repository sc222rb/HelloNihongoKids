import React, { useState, useEffect } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IMG_URL_BOY1 = (new URL('/public/images/avatar/boy1.png', import.meta.url)).href
const IMG_URL_BOY2 = (new URL('/public/images/avatar/boy2.png', import.meta.url)).href
const IMG_URL_BOY3 = (new URL('/public/images/avatar/boy3.png', import.meta.url)).href
const IMG_URL_GIRL1 = (new URL('/public/images/avatar/girl1.png', import.meta.url)).href
const IMG_URL_GIRL2 = (new URL('/public/images/avatar/girl2.png', import.meta.url)).href
const IMG_URL_GIRL3 = (new URL('/public/images/avatar/girl3.png', import.meta.url)).href

const UpdateProfile = ({ user }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const avatarOptions = [
    { value: 'boy1', label: 'boy1', avatar: IMG_URL_BOY1 },
    { value: 'boy2', label: 'boy2', avatar: IMG_URL_BOY2 },
    { value: 'boy3', label: 'boy3', avatar: IMG_URL_BOY3 },
    { value: 'girl1', label: 'girl1', avatar: IMG_URL_GIRL1 },
    { value: 'girl2', label: 'girl2', avatar: IMG_URL_GIRL2 },
    { value: 'girl3', label: 'girl3', avatar: IMG_URL_GIRL3 },
  ]

  useEffect(() => {
    // Fetch user data again when component mounts
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUsername(response.data.username)
      setEmail(response.data.email)
      setAvatar(response.data.avatar)
    } catch (error) {
      setError('Error fetching user data.')
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userId = localStorage.getItem('userId')
      const accessToken = localStorage.getItem('accessToken')
      console.log('Update Profile ...')
      console.log('Name:', username)
      console.log('Email:', email)
      console.log('Password:', password)
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, { username, email, password, avatar }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (response.status === 204) {
        navigate('/')
      } else {
        setError('Unexpected response. Please try again.')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
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
    <div className="col-md-4 mx-auto">
      <h2 className="text-center mb-4">Edit Profile</h2>
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
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Choose Avatar</Form.Label>
          <div className="d-flex flex-wrap">
            {avatarOptions.map(option => (
              <button
                key={option.value}
                className={`me-3 mb-3 ${avatar === option.value ? 'selected' : ''}`}
                style={{ cursor: 'pointer', borderColor: avatar === option.value ? 'lightblue' : 'gray' }}
                onClick={() => setAvatar(option.value)}
                type="button"
              >
                <img src={option.avatar} alt={option.label} style={{ width: '1.5em', height: '1.5em' }} />
              </button>
            ))}
          </div>
        </Form.Group>
        <div className="text-center">
          <button type="submit">Save Changes</button>
        </div>
      </Form>
    </div>
  )
}

export default UpdateProfile
