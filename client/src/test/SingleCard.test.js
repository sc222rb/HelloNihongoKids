import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SingleCard from '../components/SingleCard/SingleCard'
import '@testing-library/jest-dom/extend-expect'

describe('SingleCard Component', () => {
  const card = { text: 'A', src: 'image.png' }
  const handleChoice = jest.fn()

  test('handles click when not disabled', () => {
    render(<SingleCard card={card} handleChoice={handleChoice} flipped={false} disabled={false} />)

    fireEvent.click(screen.getByText(/🌸/i))
    expect(handleChoice).toHaveBeenCalledWith(card)
  })

  test('does not handle click when disabled', () => {
    render(<SingleCard card={card} handleChoice={handleChoice} flipped={false} disabled={true} />)

    fireEvent.click(screen.getByText(/🌸/i))
    expect(handleChoice).not.toHaveBeenCalled()
  })
})
