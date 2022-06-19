import { createContext, useCallback, useEffect, useState } from 'react'

const ToastContext = createContext()

const seconds = (a) => a * 1000
const TOAST_TIMEOUT = seconds(3)

const ToastContextProvider = ({ children }) => {
  const [message, setMessage] = useState('')
  const [undo, setUndo] = useState({ action: null })
  const [active, setActive] = useState('')
  const [resetTimeout, setResetTimeout] = useState(null)

  const toast = useCallback(
    (message, undoCallback) => {
      clearTimeout(resetTimeout)
      setMessage(message)
      setUndo({ action: undoCallback })
      setActive(true)
    },
    [resetTimeout]
  )

  const reset = useCallback(() => {
    setActive(false)
    // reset the reset
    const timeout = setTimeout(() => setMessage(''), 500)
    setResetTimeout(timeout)
    setUndo({ action: null })
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
        undo,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export { ToastContextProvider, ToastContext }
