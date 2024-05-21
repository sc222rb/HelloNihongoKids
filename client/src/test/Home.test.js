import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../components/Home/Home'

describe('Home component', () => {
  it('renders correctly', () => {
    render(<Home />)
    const headingElement = screen.getByText(/Welcome to Hello Nihongo Kids!/i)
    const paragraphElement = screen.getByText(/This is a learning platform for Japanese characters, Hiragana and Katakana/i)

    expect(headingElement).toBeInTheDocument()
    expect(paragraphElement).toBeInTheDocument()
  })
})
