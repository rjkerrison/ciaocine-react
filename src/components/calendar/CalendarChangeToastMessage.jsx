import { formatAs } from '../../utils/formatDate'

const CalendarChangeToastMessage = ({ isRemove, movie, cinema, startTime }) => {
  return (
    <>
      {isRemove ? 'Removed' : 'Added'} <strong>{movie.title}</strong> at{' '}
      <strong>{cinema?.name}</strong> at{' '}
      <strong>{formatAs.time(startTime)}</strong> {isRemove ? 'from' : 'to'}{' '}
      your calendar
    </>
  )
}

export default CalendarChangeToastMessage
