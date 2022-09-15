import { useContext } from 'react'
import { CalendarContext } from '../../context/CalendarContext'
import { ToastContext } from '../../context/ToastContext'
import { formatAs } from '../../utils/formatDate'
import Authenticated from '../shared/Authenticated'
import Button from '../shared/Button'

const ConcurrencyExclusionButton = ({ _id, movie, startTime }) => {
  const { toast } = useContext(ToastContext)
  const { toggleSelectedShowtimeId, isSelectedShowtimeId } =
    useContext(CalendarContext)

  const isActive = isSelectedShowtimeId(_id)
  const description = `${movie.title} at ${formatAs.time(startTime)}`

  const title = isActive
    ? `Remove concurrency exclusion check with ${description}`
    : `Filter only showings at a different time to ${description}`

  return (
    <Button
      isActive={isActive}
      classes={['round']}
      title={title}
      onClick={async () => {
        toggleSelectedShowtimeId(_id)
        toast(
          <>
            {!isActive
              ? 'Showing only films that can be seen along with'
              : 'Removed concurrency exclusion check with'}{' '}
            <strong>{movie.title}</strong> at{' '}
            <strong>{formatAs.time(startTime)}</strong>
          </>
        )
      }}
    >
      <span>{isActive ? '💫' : '☄️'}</span>
      <span className='sr-only'></span>
    </Button>
  )
}

export default Authenticated(ConcurrencyExclusionButton)
