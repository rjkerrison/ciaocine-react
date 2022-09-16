import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { MetadataContext } from '../../context/MetadataContext'
import Button from '../shared/Button'

const MovieActions = ({ setIsHidden, title, slug }) => {
  const { isLoggedIn, fireOrQueueAuthenticatedAction } = useContext(AuthContext)
  const { metadata, markAs } = useContext(MetadataContext)

  const actions = [
    {
      isActive: metadata.watches.includes(slug),
      label: metadata.watches.includes(slug) ? 'Watched' : 'Unwatched',
      onClick: () => {
        fireOrQueueAuthenticatedAction(() => markAs.watched(slug, { title }), {
          message: 'Log in to save your watched films',
        })
      },
    },
    {
      isActive: metadata.dismisses.includes(slug),
      label: 'Dismiss',
      onClick: () => {
        setIsHidden(true)
        if (isLoggedIn) {
          markAs.dismissed(slug, { title })
        }
      },
    },
    {
      isActive: metadata.wants.includes(slug),
      label: metadata.wants.includes(slug)
        ? 'You want to see this'
        : 'Want to see this?',
      onClick: () => {
        fireOrQueueAuthenticatedAction(() => markAs.wanted(slug, { title }), {
          message: 'Log in to bookmark films',
        })
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
