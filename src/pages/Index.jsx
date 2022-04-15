import React from 'react'
import { Link } from 'react-router-dom'
import AddToCalendar from '../components/AddToCalendar'
import { formatAs } from '../utils/formatDate'

const Index = () => {
  const appTitle = 'Ciaocine'
  const pageSubtitle = 'Homepage'

  // make this read random showtime from axios call
  const showtime = {
    cinema: { id: null, name: 'to do' },
    startTime: new Date(),
    movie: {
      title: 'movie',
    },
  }

  return (
    <>
      <section className='splash'>
        <h2>{appTitle}</h2>
        <p>{pageSubtitle}</p>
      </section>
      <section className='random-screening'>
        <h2>
          Have you seen <strong>{showtime.movie.title}</strong>?
        </h2>
        <p>
          Why not see it at{' '}
          <Link to={`/cinema/${showtime.cinema.id}`}>
            {showtime.cinema.name}
          </Link>{' '}
          at <strong>{formatAs.time(showtime.startTime)}</strong>
          on <strong>{formatAs.date(showtime.startTime)}</strong>?
          <AddToCalendar showtime={showtime} />
        </p>
        <picture>
          <img src={showtime.movie.poster} alt={showtime.movie.title} />
        </picture>
      </section>
    </>
  )
}

export default Index
