import { useContext } from 'react'
import { addToCalendar } from '../api/calendar'
import { AuthContext } from '../context/AuthContext'
import { formatAs } from '../utils/formatDate'

const AddToCalendar = ({ _id, title, startTime, cinema }) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    return <></>
  }

  const description = `Add ${title} at ${cinema?.name} at ${formatAs.time(
    startTime
  )} to your calendar`

  return (
    <button
      className='add-to-calendar'
      title={description}
      onClick={() => addToCalendar(_id)}
    >
      +<span className='sr-only'>{description}</span>
    </button>
  )
}

export default AddToCalendar
