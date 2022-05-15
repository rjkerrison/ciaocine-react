import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'
import './toast.scss'

const Toast = () => {
  const { message, active } = useContext(ToastContext)

  return (
    <div className={'toast-container ' + (active ? '' : 'bye-bye-bye')}>
      <p className='toast'>{message}</p>
    </div>
  )
}

export default Toast
