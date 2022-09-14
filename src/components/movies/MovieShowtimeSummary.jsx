import { useState } from 'react'
import MovieShowtimes from './MovieShowtimes'
import MovieActions from './MovieActions'
import MovieSummary from '../shared/MovieSummary'

const MovieShowtimeSummary = ({ movie, showtimes }) => {
  const [isHidden, setIsHidden] = useState(false)

  if (isHidden) {
    return <></>
  }

  return (
    <MovieSummary movie={movie}>
      {({ Actions, Showtimes }) => {
        return (
          <>
            <Showtimes>
              <MovieShowtimes showtimes={showtimes} movie={movie} />
            </Showtimes>
            <Actions>
              <MovieActions setIsHidden={setIsHidden} {...movie} />
            </Actions>
          </>
        )
      }}
    </MovieSummary>
  )
}

export default MovieShowtimeSummary
