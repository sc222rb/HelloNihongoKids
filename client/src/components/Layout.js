import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => { 

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/logIn">Log In</Link>
          </li>
          <li>
            <Link to="/signUp">Sign Up</Link>
          </li>
          <li>
            <Link to="/progressTracking">Progress Tracking</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}

export default Layout