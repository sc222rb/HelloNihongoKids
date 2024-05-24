import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import Game from '../components/Game/Game.js'
import * as CardData from '../components/CardData/CardData.js'
import '@testing-library/jest-dom/extend-expect'
import { queryByText } from '@testing-library/react'

jest.mock('axios')

describe('Game Component', () => {
  beforeEach(() => {
    // Mock local storage
    Storage.prototype.getItem = jest.fn((key) => {
      switch (key) {
        case 'accessToken':
          return 'fakeAccessToken'
        case 'userId':
          return 'fakeUserId'
        default:
          return null
      }
    })

    // Mock CardData
    CardData.columnA = [
      { label: 'あ', matched: false },
      { label: 'い', matched: false },
    ]
  })

  test('renders Game component with initial state', () => {
    render(<Game />)
    expect(screen.getByText(/Hiragana and Katakana Match/i)).toBeInTheDocument()
    expect(screen.getByText(/Turns:/i)).toBeInTheDocument()
  })

  test('handles column selection and shuffles cards', () => {
    render(<Game />)
    fireEvent.click(screen.getByText('あ行'))
    expect(screen.getByText('New Game')).toBeInTheDocument()
    expect(screen.getByText('Turns: 0')).toBeInTheDocument()
  })

  test('handles card selection and matching', async () => {
    render(<Game />)
    fireEvent.click(screen.getByText('あ行'))
    
    const cards = screen.getAllByRole('button')
    fireEvent.click(cards[0])
    fireEvent.click(cards[1])
    
    await waitFor(() => {
      expect(screen.getByText(/Turns: \d+/)).toBeInTheDocument()
    })
  })  
  
})
