import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'
import Button from './shared/Button'
import './toast.scss'

const Toast = () => {
  const { message, active, undo } = useContext(ToastContext)

  return (
    <div className={'toast-container ' + (active ? '' : 'bye-bye-bye')}>
      <div className='toast'>
        <p>{message}</p>
        {undo.action && <Button onClick={undo.action}>Undo</Button>}
      </div>
    </div>
  )
}

export default Toast
