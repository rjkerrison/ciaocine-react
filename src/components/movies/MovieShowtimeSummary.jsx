import MovieShowtimes from './MovieShowtimes'
import MovieActions from './MovieActions'
import MovieSummary from './MovieSummary'

const MovieShowtimeSummary = ({ movie, showtimes }) => {
  return (
    <MovieSummary movie={movie}>
      {({ Actions, Showtimes }) => {
        return (
          <>
            <Showtimes>
              <MovieShowtimes showtimes={showtimes} movie={movie} />
            </Showtimes>
            <Actions>
              <MovieActions {...movie} />
            </Actions>
          </>
        )
      }}
    </MovieSummary>
  )
}

export default MovieShowtimeSummary
