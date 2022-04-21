import { useState } from 'react'
import MovieShowtimeSummary from './MovieShowtimeSummary'

const MovieList = ({ movies, showMovieInPopup, isLoading }) => {
  const [isPosterTileView, setIsPosterTileView] = useState(false)

  if (isLoading) {
    return <div className='loading'>LOADING</div>
  }

  return (
    <>
      <button onClick={() => setIsPosterTileView((s) => !s)}>
        View toggle
      </button>
      <div
        className={['movies', isPosterTileView ? 'poster-tile-view' : ''].join(
          ' '
        )}
      >
        {movies.map((props) => (
          <MovieShowtimeSummary
            key={props.movie._id}
            {...props}
            show={showMovieInPopup}
          />
        ))}
      </div>
    </>
  )
}

export default MovieList
