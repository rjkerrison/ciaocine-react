import MovieHeading from '../MovieHeading'
import MovieShowtimes from '../MovieShowtimes'

const MovieShowtimeSummary = ({ movie, showtimes, show }) => {
  return (
    <div className='movie overlay-container expander-container'>
      <MovieHeading {...movie} show={show} />

      <MovieShowtimes showtimes={showtimes} />
    </div>
  )
}

export default MovieShowtimeSummary
