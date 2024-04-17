import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/games">Games</Nav.Link>
            <Nav.Link as={Link} to="/logIn">Log In</Nav.Link>
            <Nav.Link as={Link} to="/signUp">Sign Up</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/userProfile">User Profile</Nav.Link>
            <Nav.Link as={Link} to="/progressTracking">Progress Tracking</Nav.Link>
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

export default Layout