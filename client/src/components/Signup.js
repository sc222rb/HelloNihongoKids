import React, { useState } from 'react';
import Button from './Button';
import InputText from './InputText';

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
        <InputText 
          type="userName"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <InputText 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputText
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <Button
          buttonText="Sign Up"
          onClick={handleSignup}
        />
      </form>
    </div>
  )
}

export default Signup