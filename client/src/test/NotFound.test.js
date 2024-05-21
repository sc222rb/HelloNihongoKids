import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';

describe('NotFound Component', () => {
  it('renders the 404 error page with a link to the home page', () => {
    // Render the NotFound component
    render(
      <Router>
        <NotFound />
      </Router>
    );

    // Assert that the heading "Nothing to see here!" is rendered
    expect(screen.getByText('Nothing to see here!')).toBeInTheDocument();

    // Assert that the link to the home page is rendered with the correct text and URL
    const linkElement = screen.getByRole('link', { name: /go to the home page/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');

    // Assert that the link redirects to the home page
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});
