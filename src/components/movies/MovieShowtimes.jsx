import { useState } from 'react'

import './MovieShowtimes.scss'

import Button from '../shared/Button'
import ShowtimeCard from '../showtimes/ShowtimeCard'

const toShowtimeCard = (showtime, movie, isHidden = false) => {
  return (
    <ShowtimeCard
      {...movie}
      {...showtime}
      key={showtime._id}
      className={isHidden && 'expanded-only'}
    />
  )
}

const toHiddenShowtimeCard = (showtime, movie) =>
  toShowtimeCard(showtime, movie, true)

const MovieShowtimes = ({ showtimes, movie, children, overflowLimit = 6 }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!showtimes || showtimes.length === 0) {
    return children
  }

  if (showtimes.length > overflowLimit) {
    const toShow = showtimes
      .slice(0, overflowLimit - 1)
      .map((s) => toShowtimeCard(s, movie))
    const toHide = showtimes
      .slice(overflowLimit - 1)
      .map((s) => toHiddenShowtimeCard(s, movie))

    return (
      <div
        className={`movie-showtimes expander-container ${
          isExpanded ? 'expanded' : ''
        }`}
      >
        {toShow}
        {toHide}
        <Button
          isActive={isExpanded}
          label={isExpanded ? 'Hide' : 'Show all ' + showtimes.length}
          onClick={() => {
            setIsExpanded((c) => !c)
          }}
        />
        {children}
      </div>
    )
  }

  const toShow = showtimes.map((s) => toShowtimeCard(s, movie))

  return <div className='movie-showtimes'>{toShow}</div>
}

export default MovieShowtimes
