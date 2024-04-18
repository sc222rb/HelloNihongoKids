import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Games = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">Games</h1>
          <p className="text-center">Hiragana to Latin Alphabet Match</p>
          <p className="text-center">Katakana to Latin Alphabet Match</p>
          <p className="text-center">Hiragana to Katakana Match</p>
          <p className="text-center">Katakana to Hiragana Match</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Games
