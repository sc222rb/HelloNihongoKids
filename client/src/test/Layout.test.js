import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

describe('Layout component', () => {
  it('renders navigation links correctly when logged in', () => {
    render(<Router><Layout isLoggedIn={true} /></Router>)
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    expect(screen.getByText(/Game/i)).toBeInTheDocument()
    expect(screen.getByText(/Profile/i)).toBeInTheDocument()
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument()
  })

  it('renders navigation links correctly when not logged in', () => {
    render(<Router><Layout isLoggedIn={false} /></Router>)
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    expect(screen.queryByText(/Game/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Login/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
  })

  it('renders child components correctly', () => {
    // You can add a mock child component here and test if it's rendered correctly
  })
})
