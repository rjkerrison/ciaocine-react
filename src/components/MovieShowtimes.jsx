import { useState } from 'react'
import Button from './shared/Button'
import ShowtimeCard from './ShowtimeCard'

const toShowtimeCard = (showtime, movie, isHidden = false) => {
  return (
    <ShowtimeCard
      {...movie}
      {...showtime}
      key={showtime._id}
      className={isHidden && 'expanded-only'}
    >
      {JSON.stringify(showtime)}
    </ShowtimeCard>
  )
}

const toHiddenShowtimeCard = (showtime, movie) =>
  toShowtimeCard(showtime, movie, true)

const overflowLimit = 6

const MovieShowtimes = ({ showtimes, movie }) => {
  const [isExpanded, setIsExpanded] = useState(false)

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
          label={isExpanded ? 'Hide' : 'Show more'}
          onClick={() => {
            setIsExpanded((c) => !c)
          }}
        />
      </div>
    )
  }

  const toShow = showtimes.map((s) => toShowtimeCard(s, movie))

  return <div className='movie-showtimes'>{toShow}</div>
}

export default MovieShowtimes
