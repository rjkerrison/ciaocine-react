import { useContext, useMemo } from 'react'
import { CalendarContext } from '../../context/CalendarContext'
import { ToastContext } from '../../context/ToastContext'
import { formatAs } from '../../utils/formatDate'
import Authenticated from '../shared/Authenticated'

const getDescription = (title, cinema, startTime, isInCalendar) => {
  const parts = isInCalendar
    ? { verb: 'Remove', preposition: 'from' }
    : { verb: 'Add', preposition: 'to' }

  return `${parts.verb} ${title} at ${cinema?.name} at ${formatAs.time(
    startTime
  )} ${parts.preposition} your calendar`
}

const AddToCalendar = ({ _id, title, startTime, cinema }) => {
  const { toast } = useContext(ToastContext)
  const { remove, add, getIsInCalendar } = useContext(CalendarContext)

  const isInCalendar = useMemo(
    () => getIsInCalendar(_id),
    [_id, getIsInCalendar]
  )

  const description = useMemo(
    () => getDescription(title, cinema, startTime, isInCalendar),
    [title, cinema, startTime, isInCalendar]
  )

  const className = `round ${isInCalendar ? 'active' : ''}`
  const symbol = isInCalendar ? '✔' : '+'

  return (
    <button
      className={className}
      title={description}
      onClick={async () => {
        if (isInCalendar) {
          await remove(_id)
          toast(description.replace('Remove', 'Removed'))
        } else {
          await add(_id)
          toast(description.replace('Add', 'Added'))
        }
      }}
    >
      <span>{symbol}</span>
      <span className='sr-only'>{description}</span>
    </button>
  )
}

export default Authenticated(AddToCalendar)
