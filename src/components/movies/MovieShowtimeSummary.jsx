import MovieHeading from '../MovieHeading'
import MovieShowtimes from '../MovieShowtimes'

const MovieShowtimeSummary = ({ movie, showtimes }) => {
  return (
    <div className='movie'>
      <MovieHeading {...movie} />
      <MovieShowtimes showtimes={showtimes} movie={movie} />
    </div>
  )
}

export default MovieShowtimeSummary
