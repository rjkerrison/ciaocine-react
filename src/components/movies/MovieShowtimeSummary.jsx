import { useState } from 'react'
import MovieHeading from '../MovieHeading'
import MovieShowtimes from '../MovieShowtimes'

const MovieShowtimeSummary = ({ movie, showtimes }) => {
  const [isHidden, setIsHidden] = useState(false)

  if (isHidden) {
    return <></>
  }

  return (
    <div className='movie overlay-container expander-container'>
      <MovieHeading {...movie} />
      <MovieShowtimes showtimes={showtimes} movie={movie} />
      <button onClick={setIsHidden}>Cacher ce film</button>
    </div>
  )
}

export default MovieShowtimeSummary
