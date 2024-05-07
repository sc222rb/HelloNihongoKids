import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Games.css';
import SingleCard from '../SingleCard/SingleCard.js'

const cardData = [
  { "src": 'あ', text: 'あ', label: 'a', matched: false },
  { "src": 'い', text: 'い', label: 'i', matched: false },
  { "src": 'う', text: 'う', label: 'u', matched: false },
  { "src": 'え', text: 'え', label: 'e', matched: false },
  { "src": 'お', text: 'お', label: 'o', matched: false },
  { "src": 'ア', text: 'ア', label: 'a', matched: false },
  { "src": 'イ', text: 'イ', label: 'i', matched: false },
  { "src": 'ウ', text: 'ウ', label: 'u', matched: false },
  { "src": 'エ', text: 'エ', label: 'e', matched: false },
  { "src": 'オ', text: 'オ', label: 'o', matched: false }
]
const Games = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardData]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
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
      setDisabled(true)
      if (choiceOne.label === choiceTwo.label) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.label === choiceOne.label) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="Game">
            <h1>Hiragana and Katakana Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <p>Turns: {turns}</p>
            <div className="card-grid">
              {cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
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
