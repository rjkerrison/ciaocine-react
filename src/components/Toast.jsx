import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

const Toast = () => {
  const { message, active } = useContext(ToastContext)

  return (
    <div className={'popup-container ' + (active ? '' : 'bye-bye-bye')}>
      <p className='popup'>{message}</p>
    </div>
  )
}

export default Toast
