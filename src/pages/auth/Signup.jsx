import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../api/auth'
import PopupLink from '../../components/shared/PopupLink'
import { quotes } from '../../components/shared/Quote'
import AuthPage from './AuthPage'

const SignupPage = ({ message }) => {
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleSignupSubmit = async ({ username, password }) => {
    try {
      const { isSignedUp, errorMessage } = await signup({ username, password })
      if (!isSignedUp) {
        setErrorMessage(errorMessage)
      } else {
        navigate('/auth/login', {
          state: { message: `User ${username} created successfully!` },
        })
      }
    } catch (error) {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    }
  }

  return (
    <AuthPage
      handleSubmit={handleSignupSubmit}
      errorMessage={errorMessage}
      message={message}
      backdrop={`url(https://www.cnet.com/a/img/resize/24fba7a8eb4f59a9d49969fe2e2ebffc0d470fa8/2015/12/23/899bd25f-a772-45c5-8ee0-37ccdd2348f3/die-hard.jpg?auto=webp&fit=crop&height=675&width=1200)`}
      label='Sign Up'
      quote={quotes.dieHard}
      alternative={
        <p>
          Already have an account?{' '}
          <PopupLink to={'/auth/login'}>Login</PopupLink>.
        </p>
      }
    />
  )
}

export default SignupPage
