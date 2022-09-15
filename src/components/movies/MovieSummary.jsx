import MovieHeading from '../MovieHeading'
import Actions from './Actions'
import './MovieSummary.scss'

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
