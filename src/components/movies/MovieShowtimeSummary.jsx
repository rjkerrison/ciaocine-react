import MovieShowtimes from './MovieShowtimes'
import MovieActions from './MovieActions'
import MovieSummary from './MovieSummary'
import Actions from './Actions'
import Showtimes from './Showtimes'

const MovieShowtimeSummary = ({ movie, showtimes }) => {
  return (
    <MovieSummary movie={movie}>
      <Showtimes>
        <MovieShowtimes showtimes={showtimes} movie={movie} />
      </Showtimes>
      <Actions movie={movie}>
        <MovieActions {...movie} />
      </Actions>
    </MovieSummary>
  )
}

export default MovieShowtimeSummary
