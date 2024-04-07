import React, { useState } from 'react';

const Signup = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('Username: ', userName, 'email: ', email, 'password: ', password)
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input 
          type="userName"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup