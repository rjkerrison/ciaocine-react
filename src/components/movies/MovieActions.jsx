import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { MetadataContext } from '../../context/MetadataContext'
import Button from '../shared/Button'
import Icon from '../shared/Icon'

import CatIcon from '../../icons/cat.png'
import BinIcon from '../../icons/bin.png'

const MovieActions = ({ title, slug }) => {
  const { fireOrQueueAuthenticatedAction } = useContext(AuthContext)
  const { metadata, markAs } = useContext(MetadataContext)

  const actions = [
    {
      key: 'watches',
      isActive: metadata.watches.includes(slug),
      label: <Icon src={CatIcon} />,
      onClick: () => {
        fireOrQueueAuthenticatedAction(() => markAs.watched(slug, { title }), {
          message: 'Log in to save your watched films',
        })
      },
    },
    {
      key: 'dismisses',
      isActive: metadata.dismisses.includes(slug),
      label: <Icon src={BinIcon} />,
      onClick: () => {
        fireOrQueueAuthenticatedAction(
          () => markAs.dismissed(slug, { title }),
          {
            message: "Log in to hide films you don't want to see",
          }
        )
      },
    },
    {
      key: 'wants',
      isActive: metadata.wants.includes(slug),
      label: <span>{metadata.wants.includes(slug) ? '✔' : '+'}</span>,
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
        return (
          <Button key={action.key} classes={['action', 'round']} {...action} />
        )
      })}
    </>
  )
}

export default MovieActions
