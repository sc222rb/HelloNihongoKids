import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        // login logic here
        console.log('Email:', email)
        console.log('Password :', password)
    };

    return (
        <Stack gap={2} className="col-md-5 mx-auto">
            <FontAwesomeIcon icon={faPenToSquare} size="2x" style={{ margin: 'auto' }} />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
                    <Form.Control
                        controlId="formBasicEmail"
                        type="email"
                        placeholder="Type your Email here!"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Make sure you type your email correctly!
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                        Oops! Don't forget to type your secret password to log in!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        id="autoSizingCheck"
                        className="mb-2"
                        label="Remember me"
                    />
                    <a
                        href="/"
                        //onClick={() => nagigateToOtp()}
                        //className="text-gray-800"
                    >
                        Forgot password?
                    </a>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button type="submit">Log In</Button>
                </div>
            </Form>
        </Stack>
    )
}

export default Login