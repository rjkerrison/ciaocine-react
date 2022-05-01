import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../api/auth'
import UserForm from '../../components/auth/UserForm'
import './AuthPage.css'

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleSignupSubmit = async ({ username, password }) => {
    try {
      const { isSignedUp, errorMessage } = await signup({ username, password })
      if (!isSignedUp) {
        setErrorMessage(errorMessage)
      } else {
        navigate('/login')
      }
    } catch (error) {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    }
  }

  return (
    <div className='auth-page'>
      <h1>Sign Up</h1>

      <UserForm submitUserInfo={handleSignupSubmit} submitLabel='Sign Up' />

      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>
        Already have an account? <Link to={'/auth/login'}>Login</Link>.
      </p>
    </div>
  )
}

export default SignupPage
