import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { MetadataContext } from '../../context/MetadataContext'
import Button from '../shared/Button'
import Icon from '../shared/Icon'

import CatIcon from '../../icons/cat.png'
import GauntletIcon from '../../icons/infinity-gauntlet.png'
import BinIcon from '../../icons/bin.png'

const MovieActions = ({ title, slug }) => {
  const { fireOrQueueAuthenticatedAction } = useContext(AuthContext)
  const { metadata, markAs } = useContext(MetadataContext)

  const actions = [
    {
      isActive: metadata.watches.includes(slug),
      label: <Icon src={CatIcon} />,
      onClick: () => {
        fireOrQueueAuthenticatedAction(() => markAs.watched(slug, { title }), {
          message: 'Log in to save your watched films',
        })
      },
    },
    {
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
      isActive: metadata.wants.includes(slug),
      label: <Icon src={GauntletIcon} />,
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
