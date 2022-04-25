import MovieShowtimeSummary from './MovieShowtimeSummary'

const MovieList = ({ movies, isLoading, className }) => {
  if (isLoading) {
    return <div className='loading'>LOADING</div>
  }

  return (
    <div className={['movies', className].join(' ')}>
      {movies.map((props) => (
        <MovieShowtimeSummary key={props.movie._id} {...props} />
      ))}
    </div>
  )
}

export default MovieList
