import MovieHeading from '../MovieHeading'
import ExternalLinks from '../movies/ExternalLinks'
import './MovieSummary.scss'

const Actions = ({ children, movie }) => {
  return (
    <div className='actions'>
      <ExternalLinks {...movie} />
      {children}
    </div>
  )
}

const MovieSummary = ({ classes, movie, children, rowSpan }) => {
  return (
    <div
      className={`movie-summary ${classes?.join(' ')}`}
      style={{ gridRow: rowSpan && `span ${rowSpan}` }}
    >
      <MovieHeading {...movie} />
      {children &&
        children({
          Actions: (props) => <Actions {...props} movie={movie} />,
          Showtimes: (props) => <div className='showtimes' {...props} />,
        })}
    </div>
  )
}

export default MovieSummary
