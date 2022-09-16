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
      queuedActions.forEach((action) => action(user))
      setQueuedActions([])
    }
  }, [isLoggedIn, queuedActions, user])

  const fireOrQueueAuthenticatedAction = useCallback(
    (actionCallback, { message } = {}) => {
      if (isLoggedIn) {
        return actionCallback(user)
      }

      return new Promise((res, rej) => {
        addToQueue((newUser) => {
          Promise.resolve(actionCallback(newUser))
            .then((result) => res(result))
            .catch(rej)
        })
        navigate('/auth/login' + location.search, {
          state: {
            message,
            backgroundLocation: location,
          },
        })
      })
    },
    [isLoggedIn, navigate, location, user]
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
        fireOrQueueAuthenticatedAction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
