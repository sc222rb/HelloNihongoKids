import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">Welcome to Hello Nihongo Kids!</h1>
          <p className="lead text-center">Empowering kids to learn Japanese through fun and interactive activities.</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Home