import { Link } from 'react-router-dom'
import { formatAs } from '../../utils/formatDate'
import FloatingButtons from '../shared/FloatingButtons'
import MovieSummary from '../shared/MovieSummary'
import AddToCalendar from './AddToCalendar'
import ConcurrencyExclusionButton from './ConcurrencyExclusionButton'
import './CalendarMovieSummary.scss'

const CalendarMovieSummary = ({ movie, startTime, cinema, _id }) => {
  const endTime = new Date(startTime) - 0 + (movie.runtime || 7200) * 1000

  return (
    <MovieSummary classes={['vertical']} movie={{ ...movie }}>
      {({ Actions, Showtimes }) => {
        return (
          <>
            <Actions>
              <FloatingButtons>
                <ConcurrencyExclusionButton {...{ _id, startTime, movie }} />
                <AddToCalendar
                  {...{ title: movie.title, startTime, cinema, _id }}
                />
              </FloatingButtons>
            </Actions>
            <Showtimes>
              <p className='time'>
                {formatAs.time(startTime)} à&nbsp;{formatAs.time(endTime)}
              </p>
              <p
                className='cinema'
                title={cinema.address + ', ' + cinema.zipcode}
              >
                <Link
                  to={`/cinemas/${cinema.slug}/${formatAs.routeDate(
                    startTime
                  )}`}
                >
                  {cinema.name}
                </Link>
              </p>
            </Showtimes>
          </>
        )
      }}
    </MovieSummary>
  )
}

export default CalendarMovieSummary
