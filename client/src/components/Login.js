import React, { useState } from 'react';
import Button from './Button';
import InputText from './InputText';

const Login = () => { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        // login logic here
        console.log('Email:', email)
        console.log('Password :', password)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <InputText
                 type="text"
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
                    buttonText="Log In" 
                    onClick={handleLogin}
                />
            </form>
        </div>
    )
}

export default Login