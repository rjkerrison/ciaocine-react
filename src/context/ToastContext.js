import { createContext, useCallback, useEffect, useState } from 'react'

const ToastContext = createContext()

const seconds = (a) => a * 1000
const TOAST_TIMEOUT = seconds(3)

const ToastContextProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const [active, setActive] = useState('')
  const [resetTimeout, setResetTimeout] = useState(null)

  const toast = useCallback(
    (message) => {
      clearTimeout(resetTimeout)
      setMessage(message)
      setActive(true)
    },
    [resetTimeout]
  )

  const reset = useCallback(() => {
    setActive(false)
    // reset the reset
    const timeout = setTimeout(() => setMessage(''), 500)
    setResetTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!active) {
      return
    }
    // Deactivate after 1s
    setTimeout(reset, TOAST_TIMEOUT)
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
