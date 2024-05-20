import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import PropTypes from 'prop-types'

/**
 * Layout component representing the overall layout of the application.
 * @param {Object} props - Props for the Layout component.
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in.
 * @returns {JSX.Element} Layout component.
 */
const Layout = ({ isLoggedIn }) => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/game">Game</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}

// Define propTypes for the Layout component
Layout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // isLoggedIn prop is expected to be a boolean and is required
}

export default Layout
