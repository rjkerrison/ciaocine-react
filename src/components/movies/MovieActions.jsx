import { useContext } from 'react'
import { ToastContext } from '../../context/ToastContext'

const MovieActions = ({ setIsHidden, title }) => {
  const { toast } = useContext(ToastContext)
  return (
    <div className='movie-actions'>
      <button onClick={setIsHidden}>Dismiss</button>
      <button
        onClick={() => toast(`Okay, we'll remember how much you like ${title}`)}
      >
        Save
      </button>
    </div>
  )
}

export default MovieActions
