import { useContext, useMemo } from 'react'
import { addToCalendar } from '../../api/calendar'
import { ToastContext } from '../../context/ToastContext'
import { formatAs } from '../../utils/formatDate'
import Authenticated from '../shared/Authenticated'

const AddToCalendar = ({ _id, title, startTime, cinema }) => {
  const { toast } = useContext(ToastContext)

  const description = useMemo(
    () =>
      `Add ${title} at ${cinema?.name} at ${formatAs.time(
        startTime
      )} to your calendar`,
    [title, cinema, startTime]
  )

  return (
    <button
      className='round'
      title={description}
      onClick={async () => {
        const { added } = await addToCalendar(_id)
        if (added) {
          toast(description.replace('Add', 'Added'))
        }
      }}
    >
      +<span className='sr-only'>{description}</span>
    </button>
  )
}

export default Authenticated(AddToCalendar)
