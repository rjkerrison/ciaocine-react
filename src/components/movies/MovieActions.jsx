import { useContext } from 'react'
import { ToastContext } from '../../context/ToastContext'
import Button from '../shared/Button'
import { markAs } from './utils/relationships'

const MovieActions = ({ setIsHidden, title, _id }) => {
  const { toast } = useContext(ToastContext)

  const actions = [
    {
      label: 'Watched?',
      onClick: () => markAs.watched(_id, { title }, toast),
    },
    {
      label: 'Dismiss',
      onClick: () => {
        setIsHidden(true)
        markAs.dismissed(_id, { title }, toast)
      },
    },
    {
      label: 'Want?',
      onClick: () => markAs.wanted(_id, { title }, toast),
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
