import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getShowtimeData } from '../api/showtime'
import FavouriteCinema from '../components/FavouriteCinema'
import { MovieFullInfo } from '../components/movies/MoviePopupInner'
import { LikesContext } from '../context/LikesContext'
import { formatAs } from '../utils/formatDate'

const Showtime = () => {
  const { showtimeId } = useParams()
  const { likedCinemas, changeLikeCinema } = useContext(LikesContext)

  const [showtime, setShowtime] = useState(null)

  useEffect(() => {
    getShowtimeData(showtimeId).then((showtime) => setShowtime(showtime))
  }, [showtimeId])

  if (!showtime) {
    return (
      <section className='movies-section'>
        <h1>Loading…</h1>
      </section>
    )
  }
  const cinema = showtime.cinema

  return (
    <section className='movies-section'>
      <h1>
        <span className='line'>
          {showtime.movie.title} at {showtime.cinema.name}
        </span>{' '}
        <span className='line sub'>
          on {formatAs.dateMonth(showtime.startTime)} at{' '}
          {formatAs.time(showtime.startTime)}
        </span>
      </h1>

      <h2>Cinema info</h2>
      <h2>
        <Link to={`/cinemas/${cinema._id}`}>{cinema.name}</Link>
      </h2>

      <div className='address'>
        <p>
          {cinema.address} {cinema.zipcode} {cinema.city}
        </p>
        <FavouriteCinema
          likedCinemas={likedCinemas}
          cinema={cinema}
          setLiked={changeLikeCinema}
        />
      </div>
      <ul className='member-card-list'>
        {cinema.member_cards?.map((card) => (
          <li className='member-card' key={card.code}>
            {card.label}
          </li>
        ))}
      </ul>
      <p>{showtime.cinema.name}</p>
      <p>{showtime.cinema.address}</p>
      <p>
        {showtime.cinema.zipcode} {showtime.cinema.city}
      </p>
      <h2>Movie info</h2>
      <div>
        <MovieFullInfo movieId={showtime.movie._id} />
      </div>
    </section>
  )
}

export default Showtime
