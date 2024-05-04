import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Games.css';
import SingleCard from '../SingleCard/SingleCard.js'

const cardImages = [
  { "src": "./img/hiragana/a-gyou/a.png" },
  { "src": "./img/hiragana/a-gyou/i.png" },
  { "src": "./img/hiragana/a-gyou/u.png" },
  { "src": "./img/hiragana/a-gyou/e.png" },
  { "src": "./img/hiragana/a-gyou/o.png" },
  { "src": "./img/katakana/a-gyou/a.png" },
  { "src": "./img/katakana/a-gyou/i.png" },
  { "src": "./img/katakana/a-gyou/u.png" },
  { "src": "./img/katakana/a-gyou/e.png" },
  { "src": "./img/katakana/a-gyou/o.png" },
]
const Games = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="Games">
            <h1>Hiragana and Katakna Match</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
              {cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}
                />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Games
