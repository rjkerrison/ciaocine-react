import { createContext, useCallback, useEffect, useState } from 'react'

const ToastContext = createContext()

const ToastContextProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const [active, setActive] = useState('')

  const toast = useCallback((message) => {
    setMessage(message)
    setActive(true)
  }, [])

  const reset = useCallback(() => {
    setActive(false)
    setTimeout(() => setMessage(''), 500)
  }, [])

  useEffect(() => {
    if (!active) {
      return
    }
    // Deactivate after 1s
    setTimeout(reset, 2000)
  }, [active, reset])

  return (
    <ToastContext.Provider
      value={{
        message,
        active,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export { ToastContextProvider, ToastContext }
