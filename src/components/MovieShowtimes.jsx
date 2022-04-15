import { useState } from 'react'
import ShowtimeCard from './ShowtimeCard'

const toShowtimeCard = (showtime, isHidden = false) => {
  return (
    <ShowtimeCard {...showtime} className={isHidden && 'expanded-only'}>
      {JSON.stringify(showtime)}
    </ShowtimeCard>
  )
}

const toHiddenShowtimeCard = (showtime) => toShowtimeCard(showtime, true)

const overflowLimit = 6

const MovieShowtimes = ({ showtimes }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (showtimes.length > overflowLimit) {
    const toShow = showtimes
      .slice(0, overflowLimit - 1)
      .map((s) => toShowtimeCard(s))
    const toHide = showtimes
      .slice(overflowLimit - 1)
      .map((s) => toHiddenShowtimeCard(s))
    return (
      <div
        className={`movie-showtimes expander-container ${
          isExpanded ? 'expanded' : ''
        }`}
      >
        {toShow}
        {toHide}
        <button
          onClick={() => {
            setIsExpanded((c) => !c)
          }}
        >
          {isExpanded ? 'Hide' : 'Show more'}
        </button>
      </div>
    )
  }

  const toShow = showtimes.map(toShowtimeCard)

  return <div className='movie-showtimes'>{toShow}</div>
}

export default MovieShowtimes
