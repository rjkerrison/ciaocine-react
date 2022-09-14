import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { login } from '../../api/auth'
import './AuthPage.css'
import UserForm from '../../components/auth/UserForm'

const LoginPage = ({ message }) => {
  const { authenticateUser, isLoggedIn } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleLoginSubmit = async ({ username, password }) => {
    try {
      const { isLoggedIn, errorMessage } = await login({ username, password })
      if (!isLoggedIn) {
        setErrorMessage(errorMessage)
      } else {
        await authenticateUser()
        navigate(-1)
      }
    } catch (error) {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    }
  }

  if (isLoggedIn) {
    navigate(-1)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        '--backdrop-path': `url(https://www.gannett-cdn.com/-mm-/18e5734ece714b32cb52522096349e5f2501493c/c=77-102-1501-906/local/-/media/Louisville/Louisville/2014/07/08/1404839052000-lcjdc5-6b0iz0ln7vq5d6rub04-original.jpg)`,
      }}
      className='movie-popup-inner auth-page popup-inner'
    >
      <h1>Login</h1>
      <blockquote>
        This is a private residence, man.
        <cite>The Big Lebowski</cite>
      </blockquote>

      <UserForm submitUserInfo={handleLoginSubmit} submitLabel='Login' />

      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>
        {message || (
          <>
            Don't have an account? <Link to={'/auth/signup'}>Sign up</Link>.
          </>
        )}
      </p>
    </div>
  )
}

export default LoginPage
