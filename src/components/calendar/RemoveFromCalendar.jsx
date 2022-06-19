import { useContext, useMemo } from 'react'
import { CalendarContext } from '../../context/CalendarContext'
import { ToastContext } from '../../context/ToastContext'
import { formatAs } from '../../utils/formatDate'
import Authenticated from '../shared/Authenticated'
import CalendarChangeToastMessage from './CalendarChangeToastMessage'

const RemoveFromCalendar = ({ _id, movie, startTime, cinema }) => {
  const { toast } = useContext(ToastContext)
  const { remove } = useContext(CalendarContext)

  const description = useMemo(
    () =>
      `Remove ${movie.title} at ${cinema?.name} at ${formatAs.time(
        startTime
      )} from your calendar`,
    [movie.title, cinema, startTime]
  )

  return (
    <button
      className='round'
      title={description}
      onClick={async () => {
        const { removed } = await remove(_id)
        if (removed) {
          toast(
            <CalendarChangeToastMessage
              {...{ movie, startTime, cinema }}
              isRemove={removed}
            />
          )
        }
      }}
    >
      —<span className='sr-only'>{description}</span>
    </button>
  )
}

export default Authenticated(RemoveFromCalendar)
