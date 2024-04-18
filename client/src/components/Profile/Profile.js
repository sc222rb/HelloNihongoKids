import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UpdateProfile from '../UpdateProfile/UpdateProfile';

const Profile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`)
        setUser(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError('Error fetching user data.')
      }
    }

    fetchUser()
  }, [userId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1>User Profile</h1>
        <Link to='/user-update' className='btn btn-primary'>
          Update Profile
        </Link>
      </div>
      {user && <UpdateProfile user={user} />}
    </Container>
  )
}

export default Profile
