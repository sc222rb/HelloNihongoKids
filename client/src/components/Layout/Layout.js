import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const Layout = ({ isLoggedIn, handleLogout }) => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/game">Game</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Button variant="link" onClick={handleLogout}>Logout</Button>
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

export default Layout;
