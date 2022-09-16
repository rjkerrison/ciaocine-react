import { useState, useEffect, createContext, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyToken, removeToken } from '../api/auth'

const AuthContext = createContext()

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const [queuedActions, setQueuedActions] = useState([])

  const addToQueue = (actionCallback) => {
    setQueuedActions((actions) => [...actions, actionCallback])
  }

  useEffect(() => {
    if (isLoggedIn && queuedActions.length > 0) {
      queuedActions.forEach((action) => action())
      setQueuedActions([])
    }
  }, [isLoggedIn, queuedActions])

  const fireOrQueueAuthAction = useCallback(
    (actionCallback) => {
      if (isLoggedIn) {
        actionCallback()
        return
      }

      addToQueue(actionCallback)
      navigate('/auth/login', { state: { backgroundLocation: location } })
    },
    [isLoggedIn, navigate, location]
  )

  const authenticateUser = useCallback(async () => {
    const { isValid, user } = await verifyToken()

    if (isValid) {
      setIsLoggedIn(true)
      setIsLoading(false)
      setUser(user)
    } else {
      setIsLoggedIn(false)
      setIsLoading(false)
      setUser(null)
    }
  }, [])

  const logOutUser = () => {
    removeToken()
    authenticateUser()
  }

  useEffect(() => {
    authenticateUser()
  }, [authenticateUser])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        authenticateUser,
        logOutUser,
        fireOrQueueAuthAction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
