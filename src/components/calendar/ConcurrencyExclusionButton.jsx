import { useContext } from 'react'
import { CalendarContext } from '../../context/CalendarContext'
import { ToastContext } from '../../context/ToastContext'
import { formatAs } from '../../utils/formatDate'
import Authenticated from '../shared/Authenticated'

const ConcurrencyExclusionButton = ({ _id, movie, startTime }) => {
  const { toast } = useContext(ToastContext)
  const { toggleSelectedShowtimeId, isSelectedShowtimeId } =
    useContext(CalendarContext)

  const isSelected = isSelectedShowtimeId(_id)
  const description = `${movie.title} at ${formatAs.time(startTime)}`

  const title = isSelected
    ? `Remove concurrency exclusion check with ${description}`
    : `Filter only showings at a different time to ${description}`

  return (
    <button
      className={`round ${isSelected && 'active'}`}
      title={title}
      onClick={async () => {
        toggleSelectedShowtimeId(_id)
        if (!isSelected) {
          toast(`Showing only films that can be seen along with ${description}`)
        } else {
          toast(`Removed concurrency exclusion check with ${description}`)
        }
      }}
    >
      <span>{isSelected ? '💫' : '☄️'}</span>
      <span className='sr-only'></span>
    </button>
  )
}

export default Authenticated(ConcurrencyExclusionButton)
