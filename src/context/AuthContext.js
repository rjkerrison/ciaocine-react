import { useState, useEffect, createContext, useCallback } from 'react'
import { verifyToken, removeToken } from '../api/auth'

const AuthContext = createContext()

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
