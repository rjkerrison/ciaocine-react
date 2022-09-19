import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { login } from '../../api/auth'
import { quotes } from '../../components/shared/Quote'
import PopupLink from '../../components/shared/PopupLink'

import AuthPage from './AuthPage'

const LoginPage = ({ message }) => {
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
        navigate(-1)
      }
    } catch (error) {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    }
  }

  return (
    <AuthPage
      handleSubmit={handleLoginSubmit}
      errorMessage={errorMessage}
      message={message}
      backdrop={`url(https://www.gannett-cdn.com/-mm-/18e5734ece714b32cb52522096349e5f2501493c/c=77-102-1501-906/local/-/media/Louisville/Louisville/2014/07/08/1404839052000-lcjdc5-6b0iz0ln7vq5d6rub04-original.jpg)`}
      label='Log In'
      quote={quotes.lebowski}
      alternative={
        <p>
          Don't have an account?{' '}
          <PopupLink to={'/auth/signup'}>Sign up</PopupLink>.
        </p>
      }
    />
  )
}

export default LoginPage
