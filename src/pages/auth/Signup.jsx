import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:5005/api'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    // Create an object representing the request body
    const requestBody = { username, password }

    try {
      await axios.post(`${API_URL}/auth/signup`, requestBody)
      navigate('/login')
    } catch (error) {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    }
  }

  return (
    <div className='SignupPage'>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Username:</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleUsername}
        />

        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />

        <button type='submit'>Sign Up</button>
      </form>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={'/auth/login'}> Login</Link>
    </div>
  )
}

export default SignupPage
