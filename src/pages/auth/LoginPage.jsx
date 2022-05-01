import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { login } from '../../api/auth'
import './AuthPage.css'
import UserForm from '../../components/auth/UserForm'

const LoginPage = () => {
  const { authenticateUser } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleLoginSubmit = async ({ username, password }) => {
    try {
      const { isLoggedIn, errorMessage } = await login({ username, password })
      if (!isLoggedIn) {
        setErrorMessage(errorMessage)
      } else {
        await authenticateUser()
        navigate('/calendar')
      }
    } catch (error) {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    }
  }

  return (
    <div className='auth-page'>
      <h1>Login</h1>

      <UserForm submitUserInfo={handleLoginSubmit} submitLabel='Login' />

      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>
        Don't have an account? <Link to={'/auth/signup'}>Sign up</Link>.
      </p>
    </div>
  )
}

export default LoginPage
