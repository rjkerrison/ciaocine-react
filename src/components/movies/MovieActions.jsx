import { useContext } from 'react'
import { ToastContext } from '../../context/ToastContext'
import Button from '../shared/Button'

const MovieActions = ({ setIsHidden, title }) => {
  const { toast } = useContext(ToastContext)
  return (
    <>
      <Button classes={['action']} onClick={setIsHidden}>
        Dismiss
      </Button>
      <Button
        classes={['action']}
        onClick={() => toast(`Okay, we'll remember how much you like ${title}`)}
      >
        Save
      </Button>
    </>
  )
}

export default MovieActions
