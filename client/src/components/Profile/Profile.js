import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

/**
 * Profile component representing the user profile page.
 * @returns {JSX.Element} Profile component.
 */
const Profile = () => {
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null) // State to hold user data
  const [gameData, setGameData] = useState(null)
  const accessToken = localStorage.getItem('accessToken')
  const userId = localStorage.getItem('userId')

   /**
   * Fetches user data from the API.
   * @returns {void}
   */
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUserData(response.data) // Set user data in state
    } catch (error) {
      setError('Error fetching user data.')
    }
  }

   /**
   * Fetches game data from the API.
   * @returns {void}
   */
  const fetchGameData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/game`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setGameData(response.data)
    } catch (error) {
      setError('Error fetching game data.')
    }
  }

  useEffect(() => {
    fetchUser()
    fetchGameData()
    // eslint-disable-next-line
  }, [])

  /**
   * Formats the date.
   * @param {string} dateString - Date string.
   * @returns {string} Formatted date string.
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  /**
   * Sorts games by number of turns in ascending order.
   * @param {Object} a - First game object.
   * @param {Object} b - Second game object.
   * @returns {number} Comparison result.
   */
  const sortByTurns = (a, b) => {
    return a.turns - b.turns;
  }

  // Sorting by number of turns and retrieving the first 5 elements
  const top5Games = gameData ? gameData.sort(sortByTurns).slice(0, 5) : []

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="text-center">
          {error && <p>{error}</p>} {/* Display error message if error state is not null */}
          {userData ? (
            <div>
              <p>Name: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <Link to='/user-update' className='btn btn-primary'>
                Update Profile
              </Link>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
          {top5Games.length > 0 ? (
            <div>
              <p>Top 5 Games with the Lowest Turns:</p>
              <ul className="list-group">
                {top5Games.map((game, index) => (
                  <li className="list-group-item" key={index}>
                    <p>Game: {index + 1}, Turns: {game.turns}, Column: {game.selectedColumnName}, Date: {formatDate(game.createdAt)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No game data available.</p>
          )}
        </Col>
      </Row>
    </Container >
  )
}

export default Profile
