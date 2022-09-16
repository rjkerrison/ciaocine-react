import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ToastContext } from '../../context/ToastContext'
import Button from '../shared/Button'
import { markAs } from './utils/relationships'

const MovieActions = ({ setIsHidden, title, _id }) => {
  const { toast } = useContext(ToastContext)
  const { isLoggedIn, fireOrQueueAuthAction } = useContext(AuthContext)

  const actions = [
    {
      label: 'Watched?',
      onClick: () => {
        fireOrQueueAuthAction(() => markAs.watched(_id, { title }, toast))
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
        fireOrQueueAuthAction(() => markAs.wanted(_id, { title }, toast))
      },
    },
  ]

  return (
    <>
      {actions.map((action) => {
        return <Button classes={['action']} {...action} />
      })}
    </>
  )
}

export default MovieActions
