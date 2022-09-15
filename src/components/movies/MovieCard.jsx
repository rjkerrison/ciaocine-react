import MovieSummary from './MovieSummary'
import MovieShowtimes from './MovieShowtimes'

const MovieCard = ({ ...movie }) => {
  const { showtimes, pastShowtimeCount, ...enhancedMovie } = {
    ...movie,
    showDate: true,
  }

  return (
    <>
      <MovieSummary movie={enhancedMovie}>
        {({ Actions, Showtimes }) => {
          return (
            <>
              <Showtimes>
                {showtimes.length > 0 && (
                  <MovieShowtimes
                    showtimes={showtimes}
                    movie={enhancedMovie}
                    overflowLimit={pastShowtimeCount > 0 ? 5 : 6}
                  >
                    {pastShowtimeCount > 0 && (
                      <p className='past-showtimes'>
                        {pastShowtimeCount} past showtime
                        {pastShowtimeCount > 1 && 's'} hidden.
                      </p>
                    )}
                  </MovieShowtimes>
                )}
              </Showtimes>
              <Actions />
            </>
          )
        }}
      </MovieSummary>
    </>
  )
}

export default MovieCard
