import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Game.css';
import SingleCard from '../SingleCard/SingleCard.js'
import * as CardData from '../CardData/CardData.js'

const Game = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState([])

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...selectedColumn]
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
  }, [selectedColumn])

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="Game">
            <h1>Hiragana and Katakana Match</h1>
            <div>
              <button onClick={() => setSelectedColumn(CardData.columnA)}>あ行</button>
              <button onClick={() => setSelectedColumn(CardData.columnKa)}>か行</button>
              <button onClick={() => setSelectedColumn(CardData.columnSa)}>さ行</button>
              <button onClick={() => setSelectedColumn(CardData.columnTa)}>た行</button>
              <button onClick={() => setSelectedColumn(CardData.columnNa)}>な行</button>
              <button onClick={() => setSelectedColumn(CardData.columnHa)}>は行</button>
              <button onClick={() => setSelectedColumn(CardData.columnMa)}>ま行</button>
              <button onClick={() => setSelectedColumn(CardData.columnYa)}>や行</button>
              <button onClick={() => setSelectedColumn(CardData.columnRa)}>ら行</button>
              <button onClick={() => setSelectedColumn(CardData.columnWaWoNn)}>わをん</button>
            </div>
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

export default Game
