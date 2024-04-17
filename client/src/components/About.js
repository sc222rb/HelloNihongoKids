import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';


const About = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">Welcome to Hello Nihongo Kids!</h1>
          <p className="text-center">
            We're here to make learning Japanese characters Hiragana and Katakana fun and easy for kids. Our interactive matching games, user profiles, and progress tracking ensure an engaging learning experience. With our responsive design and cutting-edge technology, HelloNihongoKids is your go-to platform for young language enthusiasts. Join us on this exciting journey into the world of Japanese characters!
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default About
