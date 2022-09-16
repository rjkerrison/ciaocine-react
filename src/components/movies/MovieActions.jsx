import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ToastContext } from '../../context/ToastContext'
import Button from '../shared/Button'
import { markAs } from './utils/relationships'

const MovieActions = ({ setIsHidden, title, _id }) => {
  const { toast } = useContext(ToastContext)
  const { isLoggedIn, fireOrQueueAuthenticatedAction } = useContext(AuthContext)

  const actions = [
    {
      label: 'Watched?',
      onClick: () => {
        fireOrQueueAuthenticatedAction(
          () => markAs.watched(_id, { title }, toast),
          { message: 'Log in to save your watched films' }
        )
      },
    },
    {
      label: 'Dismiss',
      onClick: () => {
        setIsHidden(true)
        if (isLoggedIn) {
          markAs.dismissed(_id, { title }, toast)
        }
      },
    },
    {
      label: 'Want?',
      onClick: () => {
        fireOrQueueAuthenticatedAction(
          () => markAs.wanted(_id, { title }, toast),
          { message: 'Log in to bookmark films' }
        )
      },
    },
  ]

  return (
    <>
      {actions.map((action) => {
        return <Button key={action.label} classes={['action']} {...action} />
      })}
    </>
  )
}

export default MovieActions
