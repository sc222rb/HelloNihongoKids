import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null) // State to hold user data
  const accessToken = localStorage.getItem('accessToken')
  const userId = localStorage.getItem('userId')

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

  // Call fetchUser when component mounts
  useState(() => {
    fetchUser()
  }, [])

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="text-center">
          {error && <p>{error}</p>} {/* Display error message if error state is not null */}
          {userData ? (
            <div>
              <h2 className="mt-3">{userData.username}</h2>
              <p>Email: {userData.email}</p>
              <Link to='/user-update' className='btn btn-primary'>
                Update Profile
              </Link>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </Col>
      </Row>
    </Container >
  )
}

export default Profile
