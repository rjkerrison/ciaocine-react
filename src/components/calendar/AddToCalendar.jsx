import { useContext, useMemo, useState } from 'react'
import { CalendarContext } from '../../context/CalendarContext'
import { ToastContext } from '../../context/ToastContext'
import { formatAs } from '../../utils/formatDate'
import Authenticated from '../shared/Authenticated'
import CalendarChangeToastMessage from './CalendarChangeToastMessage'

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
  const [loading, setLoading] = useState(false)

  const isInCalendar = useMemo(() => {
    const result = getIsInCalendar(_id)
    return result
  }, [_id, getIsInCalendar])

  const description = useMemo(
    () => getDescription(title, cinema, startTime, isInCalendar),
    [title, cinema, startTime, isInCalendar]
  )

  const className = `round ${isInCalendar ? 'active' : ''} ${
    loading ? 'loading' : ''
  }`
  const symbol = isInCalendar ? '✔' : '+'

  return (
    <button
      className={className}
      title={description}
      onClick={async () => {
        setLoading(true)
        if (isInCalendar) {
          await remove(_id)
          toast(
            <CalendarChangeToastMessage
              {...{ movie: { title }, startTime, cinema }}
              isRemove={true}
            />
          )
        } else {
          await add(_id)
          toast(
            <CalendarChangeToastMessage
              {...{ movie: { title }, startTime, cinema }}
              isRemove={false}
            />
          )
        }
        setLoading(false)
      }}
    >
      <span>{symbol}</span>
      <span className='sr-only'>{description}</span>
    </button>
  )
}

export default Authenticated(AddToCalendar)
