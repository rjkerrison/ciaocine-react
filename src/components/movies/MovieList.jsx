import { useState } from 'react'
import Button from '../shared/Button'
import MovieShowtimeSummary from './MovieShowtimeSummary'

const MovieList = ({ movies, isLoading }) => {
  const [isPosterTileView, setIsPosterTileView] = useState(false)

  if (isLoading) {
    return <div className='loading'>LOADING</div>
  }

  return (
    <>
      <Button
        onClick={() => setIsPosterTileView((s) => !s)}
        label='View toggle'
      />
      <div
        className={['movies', isPosterTileView ? 'poster-tile-view' : ''].join(
          ' '
        )}
      >
        {movies.map((props) => (
          <MovieShowtimeSummary key={props.movie._id} {...props} />
        ))}
      </div>
    </>
  )
}

export default MovieList
