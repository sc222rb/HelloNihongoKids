import React from 'react';
import { Button, Col, Container, Image, Row, Stack } from 'react-bootstrap';

const UserProfile = () => {

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Edited:')
    }

    return (
        <Stack gap={2} className="col-md-5 mx-auto">
            <Container>
                <Row className="mt-5">
                    <Col xs={12} className="text-center">
                        <Image src="https://via.placeholder.com/150" roundedCircle />
                    </Col>
                    <Col xs={12} className="text-center">
                        <h2>User Name</h2>
                        <p>Email: user@example.com</p>
                        <Button variant="primary" onSubmit={handleSubmit}>Edit Profile</Button>
                    </Col>
                </Row>
            </Container>
        </Stack>
    )
}

export default UserProfile
