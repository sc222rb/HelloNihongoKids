import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Games.css';
import SingleCard from '../SingleCard/SingleCard.js'

const IMG_URL_HIRA_A = (new URL('../Games/img/hiragana/a-gyou/a.png', import.meta.url)).href
const IMG_URL_HIRA_I = (new URL('../Games/img/hiragana/a-gyou/i.png', import.meta.url)).href
const IMG_URL_HIRA_U = (new URL('../Games/img/hiragana/a-gyou/u.png', import.meta.url)).href
const IMG_URL_HIRA_E = (new URL('../Games/img/hiragana/a-gyou/e.png', import.meta.url)).href
const IMG_URL_HIRA_O = (new URL('../Games/img/hiragana/a-gyou/o.png', import.meta.url)).href
const IMG_URL_KATA_A = (new URL('../Games/img/katakana/a-gyou/a.png', import.meta.url)).href
const IMG_URL_KATA_I = (new URL('../Games/img/katakana/a-gyou/i.png', import.meta.url)).href
const IMG_URL_KATA_U = (new URL('../Games/img/katakana/a-gyou/u.png', import.meta.url)).href
const IMG_URL_KATA_E = (new URL('../Games/img/katakana/a-gyou/e.png', import.meta.url)).href
const IMG_URL_KATA_O = (new URL('../Games/img/katakana/a-gyou/o.png', import.meta.url)).href

const cardImages = [
  { "src": IMG_URL_HIRA_A },
  { "src": IMG_URL_HIRA_I },
  { "src": IMG_URL_HIRA_U },
  { "src": IMG_URL_HIRA_E },
  { "src": IMG_URL_HIRA_O },
  { "src": IMG_URL_KATA_A },
  { "src": IMG_URL_KATA_I },
  { "src": IMG_URL_KATA_U },
  { "src": IMG_URL_KATA_E },
  { "src": IMG_URL_KATA_O },
]
const Games = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      if (choiceOne.src === choiceTwo.src) {
        console.log('those cards match')
        resetTurn()
      } else {
        console.log('those cards do not match')
        resetTurn()
      }

    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="Game">
            <h1>Hiragana and Katakana Match</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
              {cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
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
