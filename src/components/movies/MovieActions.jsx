import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { MetadataContext } from '../../context/MetadataContext'
import { ToastContext } from '../../context/ToastContext'
import Button from '../shared/Button'
import { markAs } from './utils/relationships'

const MovieActions = ({ setIsHidden, title, slug, _id }) => {
  const { toast } = useContext(ToastContext)
  const { isLoggedIn, fireOrQueueAuthenticatedAction } = useContext(AuthContext)
  const { metadata } = useContext(MetadataContext)

  const actions = [
    {
      isActive: metadata.watches.includes(slug),
      label: 'Watched?',
      onClick: () => {
        fireOrQueueAuthenticatedAction(
          () => markAs.watched(_id, { title }, toast),
          { message: 'Log in to save your watched films' }
        )
      },
    },
    {
      isActive: metadata.dismisses.includes(slug),
      label: 'Dismiss',
      onClick: () => {
        setIsHidden(true)
        if (isLoggedIn) {
          markAs.dismissed(_id, { title }, toast)
        }
      },
    },
    {
      isActive: metadata.wants.includes(slug),
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
