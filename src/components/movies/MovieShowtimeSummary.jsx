import MovieHeading from '../MovieHeading'
import MovieShowtimes from '../MovieShowtimes'

const MovieShowtimeSummary = ({ movie, showtimes }) => {
  return (
    <div className='movie overlay-container expander-container'>
      <MovieHeading {...movie} />
      <MovieShowtimes showtimes={showtimes} />
    </div>
  )
}

export default MovieShowtimeSummary
