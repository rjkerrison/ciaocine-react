import MovieSummary from '../shared/MovieSummary'
import MovieShowtimes from './MovieShowtimes'

const MovieCard = ({ ...movie }) => {
  const { showtimes, pastShowtimeCount, ...enhancedMovie } = {
    ...movie,
    showDate: true,
  }

  return (
    <>
      <MovieSummary movie={enhancedMovie}>
        {showtimes.length > 0 && (
          <MovieShowtimes
            showtimes={showtimes}
            movie={enhancedMovie}
            overflowLimit={pastShowtimeCount > 0 ? 7 : 8}
          >
            {pastShowtimeCount > 0 && (
              <p className='past-showtimes'>
                {pastShowtimeCount} past showtime{pastShowtimeCount > 1 && 's'}{' '}
                hidden.
              </p>
            )}
          </MovieShowtimes>
        )}
      </MovieSummary>
    </>
  )
}

export default MovieCard
