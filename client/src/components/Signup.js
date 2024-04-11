import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faHippo, faSpider, faHorseHead, faDragon, faDove } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(faHippo)

  const avatarOptions = [
    { value: 'faHippo', label: 'faHippo', icon: faHippo },
    { value: 'faSpider', label: 'faSpider', icon: faSpider },
    { value: 'faHorseHead', label: 'faHorseHead', icon: faHorseHead },
    { value: 'faDragon', label: 'faDragon', icon: faDragon },
    { value: 'faDove', label: 'faDove', icon: faDove },
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Username: ', userName, 'email: ', email, 'password: ', password)
  }
  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><FontAwesomeIcon icon={faUser} /> Name</Form.Label>
            <Form.Control
              controlId="formBasicName"
              type="text"
              placeholder="What is the child's name?"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
            <Form.Control
              controlId="formBasicEmail"
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
              controlId="formBasicPassword"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Choose Avatar</Form.Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {avatarOptions.map(option => (
              <div key={option.value} style={{ cursor: 'pointer' }} onClick={() => setSelectedAvatar(option.value)}>
                <FontAwesomeIcon icon={option.icon} size="5x" color={selectedAvatar === option.value ? 'blue' : 'gray'} />
              </div>
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
          <div className="d-flex justify-content-center">
            <Button type="submit">Submit Form</Button>
          </div>
      </Form>
    </Stack>
  )
}

export default Signup