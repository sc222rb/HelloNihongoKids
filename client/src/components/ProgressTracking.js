import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const ProgressTracking = ({ progress }) => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">Progress Tracking</h1>
          <p className="text-center">Hiragana to Latin: 8/60</p>
          <p className="text-center">Katakana to Latin: 7/60</p>
          <p className="text-center">Hiragana to Katakana: 6/60</p>
          <p className="text-center">Katakana to Hiragana: 5/60</p>
        </Col>
      </Row>
    </Container>
  )
}

export default ProgressTracking