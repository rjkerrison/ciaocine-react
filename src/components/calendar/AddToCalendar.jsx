import { useContext, useMemo, useState } from 'react'
import { addToCalendar, removeFromCalendar } from '../../api/calendar'
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

const AddToCalendar = ({
  _id,
  title,
  startTime,
  cinema,
  isInCalendar: isInCalendarProp = false,
}) => {
  const { toast } = useContext(ToastContext)
  const [isInCalendar, setIsInCalendar] = useState(isInCalendarProp)

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
          const { removed } = await removeFromCalendar(_id)
          if (removed) {
            toast(description.replace('Remove', 'Removed'))
            setIsInCalendar(false)
          }
        } else {
          const { added } = await addToCalendar(_id)
          if (added) {
            toast(description.replace('Add', 'Added'))
            setIsInCalendar(true)
          }
        }
      }}
    >
      <span>{symbol}</span>
      <span className='sr-only'>{description}</span>
    </button>
  )
}

export default Authenticated(AddToCalendar)
