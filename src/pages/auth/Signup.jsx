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
    <div
      style={{
        '--backdrop-path': `url(https://www.cnet.com/a/img/resize/24fba7a8eb4f59a9d49969fe2e2ebffc0d470fa8/2015/12/23/899bd25f-a772-45c5-8ee0-37ccdd2348f3/die-hard.jpg?auto=webp&fit=crop&height=675&width=1200)`,
      }}
      className='movie-popup-inner auth-page popup-inner'
    >
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
