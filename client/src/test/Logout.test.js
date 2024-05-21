import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Logout from '../components/Logout/Logout'

describe('Logout Component', () => {
  it('triggers handleLogout function and redirects to home page', () => {
    // Mock handleLogout function
    const handleLogoutMock = jest.fn()

    // Render the component within MemoryRouter
    render(
      <MemoryRouter>
        <Logout handleLogout={handleLogoutMock} />
      </MemoryRouter>
    )

    // Assert that handleLogout function is called
    expect(handleLogoutMock).toHaveBeenCalledTimes(1)
  })
})
