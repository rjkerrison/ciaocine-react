import { useState } from 'react'
import MovieHeading from '../MovieHeading'
import MovieShowtimes from '../MovieShowtimes'
import ExternalLinks from './ExternalLinks'
import MovieActions from './MovieActions'

const MovieShowtimeSummary = ({ movie, showtimes }) => {
  const [isHidden, setIsHidden] = useState(false)

  if (isHidden) {
    return <></>
  }

  return (
    <div className='movie overlay-container expander-container'>
      <MovieHeading {...movie} />
      <ExternalLinks {...movie} />
      <MovieShowtimes showtimes={showtimes} movie={movie} />
      <MovieActions setIsHidden={setIsHidden} {...movie} />
    </div>
  )
}

export default MovieShowtimeSummary
