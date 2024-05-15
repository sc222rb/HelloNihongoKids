import React, { useEffect, useState, useCallback } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import './Game.css'
import SingleCard from '../SingleCard/SingleCard.js'
import * as CardData from '../CardData/CardData.js'
import axios from 'axios'

const Game = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState([])
  const [selectedColumnName, setSelectedColumnName] = useState('')
  const [gameCompleted, setGameCompleted] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


  // shuffle cards for new game
  const shuffleCards = useCallback(() => {
    const shuffledCards = [...selectedColumn]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setGameCompleted(false)
  }, [selectedColumn]);

  const handleColumnSelection = (column, columnName) => {
    setSelectedColumn(column);
    setSelectedColumnName(columnName);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.label === choiceTwo.label) {
        setCards(prevCards => {
          const updatedCards = prevCards.map(card => {
            if (card.label === choiceOne.label) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
          const allMatched = updatedCards.every(card => card.matched)
          if (allMatched) {
            setGameCompleted(true)
          }
          return updatedCards
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  const sendGameDataToBackend = async (turns, selectedColumnName) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/game`, {
        selectedColumnName, turns
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (response.status === 201) {
        setSuccessMessage('Game data saved successfully.')
      } else {
        setError('Unexpected response. Please try again.')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setError('Server error. Please try again later.')
        } else {
          setError('An error occurred. Please try again.')
        }
      } else if (error.request) {
        setError('Network error. Please check your internet connection and try again.')
      } else {
        setError('An error occurred. Please try again.')
      }
    }
  }
 
  useEffect(() => {
    if (gameCompleted) {
      sendGameDataToBackend(turns, selectedColumnName);
    }
  }, [gameCompleted, selectedColumnName, turns])

  // start new game automatically
  useEffect(() => {
    shuffleCards()
  }, [selectedColumn, shuffleCards])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 2000); // 2 seconds, adjust as needed
  
      return () => clearTimeout(timer); // cleanup function to clear timeout when component unmounts or when error changes
    }
  }, [error])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 2000); // 2 seconds, adjust as needed
  
      return () => clearTimeout(timer); // cleanup function to clear timeout when component unmounts or when successMessage changes
    }
  }, [successMessage])

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="Game">
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
            <h1>Hiragana and Katakana Match</h1>
            <div>
              <button onClick={() => handleColumnSelection(CardData.columnA, 'あ行')}>あ行</button>
              <button onClick={() => handleColumnSelection(CardData.columnKa, 'か行')}>か行</button>
              <button onClick={() => handleColumnSelection(CardData.columnSa, 'さ行')}>さ行</button>
              <button onClick={() => handleColumnSelection(CardData.columnTa, 'た行')}>た行</button>
              <button onClick={() => handleColumnSelection(CardData.columnNa, 'な行')}>な行</button>
              <button onClick={() => handleColumnSelection(CardData.columnHa, 'は行')}>は行</button>
              <button onClick={() => handleColumnSelection(CardData.columnMa, 'ま行')}>ま行</button>
              <button onClick={() => handleColumnSelection(CardData.columnYa, 'や行')}>や行</button>
              <button onClick={() => handleColumnSelection(CardData.columnRa, 'ら行')}>ら行</button>
              <button onClick={() => handleColumnSelection(CardData.columnWaWoNn, 'わをん')}>わをん</button>
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
            {gameCompleted && <p>Congratulations! You've matched all the cards!</p>}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Game
