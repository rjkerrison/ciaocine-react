import MovieSummary from './MovieSummary'
import MovieShowtimes from './MovieShowtimes'
import MovieActions from './MovieActions'

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
                {
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
                }
              </Showtimes>
              <Actions>
                <MovieActions {...movie} />
              </Actions>
            </>
          )
        }}
      </MovieSummary>
    </>
  )
}

export default MovieCard
