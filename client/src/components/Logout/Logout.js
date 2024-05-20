import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * Logout component.
 * This component triggers the logout action and redirects the user to the home page.
 * @param {Object} props - Component props.
 * @param {Function} props.handleLogout - Function to handle the logout action.
 * @returns {JSX.Element} - JSX element representing the logout component.
 */
const Logout = ({ handleLogout }) => {
  useEffect(() => {
    handleLogout()
  }, [handleLogout])

  return <Navigate to="/" />
}

// Define propTypes for the Logout component
Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired, // handleLogout prop is expected to be a function and is required
}

export default Logout