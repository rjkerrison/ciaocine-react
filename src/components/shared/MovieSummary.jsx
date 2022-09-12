import MovieHeading from '../MovieHeading'
import ExternalLinks from '../movies/ExternalLinks'
import './MovieSummary.scss'

const MovieSummary = ({ movie, children }) => {
  return (
    <div className='movie-summary'>
      <MovieHeading {...movie} />
      <ExternalLinks {...movie} />
      {children}
    </div>
  )
}

export default MovieSummary
