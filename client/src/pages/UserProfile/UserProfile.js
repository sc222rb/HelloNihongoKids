import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

const UserProfile = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Edited:')
  }

  return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4} className="text-center">
                    <Image src="https://via.placeholder.com/150" roundedCircle />
                    <h2 className="mt-3">User Name</h2>
                    <p>Email: user@example.com</p>
                    <Button variant="primary" onClick={handleSubmit}>Edit Profile</Button>
                </Col>
            </Row>
        </Container>
  )
}

export default UserProfile
