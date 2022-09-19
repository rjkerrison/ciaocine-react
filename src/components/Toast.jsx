import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'
import Button from './shared/Button'
import './toast.scss'

const seconds = (a) => a * 1000
const TOAST_TIMEOUT = seconds(3)

const ToastsContainer = () => {
  const { toasts } = useContext(ToastContext)

  useEffect(() => {
    console.log('TOASTS UPDATED', toasts)
  }, [toasts])

  return (
    <div className='toasts-container'>
      {toasts.map(({ id, ...toast }, i) => (
        <Toast key={id} index={i} {...toast} />
      ))}
    </div>
  )
}

const Toast = ({ message, undo, remove, index }) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)

    const hideTimeout = setTimeout(() => setActive(false), TOAST_TIMEOUT)
    const removeTimeout = setTimeout(remove, 2 * TOAST_TIMEOUT)

    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(removeTimeout)
    }
  }, [remove])

  return (
    <div
      className={'toast-container ' + (active ? '' : 'bye-bye-bye')}
      style={{ '--index': index }}
    >
      <div className='toast'>
        <p>{message}</p>
        {undo.action && <Button onClick={undo.action}>Undo</Button>}
      </div>
    </div>
  )
}

export default ToastsContainer
