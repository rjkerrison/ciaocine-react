import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../utils/consts'
import { AuthContext } from '../../context/AuthContext'
import { storeToken } from '../../api/auth'

const LoginPage = () => {
  const { authenticateUser } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    // Create an object representing the request body
    const requestBody = { username, password }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, requestBody)

      console.log('JWT RETURNED', response.data)

      storeToken(response.data.authToken)
      authenticateUser()

      navigate('/')
    } catch (error) {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    }
  }

  return (
    <div className='LoginPage'>
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
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

        <button type='submit'>Login</button>
      </form>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  )
}

export default LoginPage
