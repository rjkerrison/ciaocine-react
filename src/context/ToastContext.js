import { createContext, useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'

const ToastContext = createContext()

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, undoCallback) => {
    const id = uuid()

    setToasts((current) => [
      ...current,
      {
        id,
        message,
        undo: { action: undoCallback },
        // To allow the Toast.jsx component to govern its own animation timings,
        // we provide it the responsibility of removing each toast.
        remove: () =>
          setToasts((current) =>
            current.filter(({ id: foundId }) => foundId !== id)
          ),
      },
    ])
  }, [])

  return (
    <ToastContext.Provider
      value={{
        toasts,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export { ToastContextProvider, ToastContext }
