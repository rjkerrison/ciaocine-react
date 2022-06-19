import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'
import './toast.scss'

const Toast = () => {
  const { message, active, undo } = useContext(ToastContext)

  return (
    <div className={'toast-container ' + (active ? '' : 'bye-bye-bye')}>
      <div className='toast'>
        <p>{message}</p>
        {undo.action && <button onClick={undo.action}>Undo</button>}
      </div>
    </div>
  )
}

export default Toast
