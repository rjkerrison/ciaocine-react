import React from 'react'
import { Link } from 'react-router-dom'
import AddToCalendar from '../components/AddToCalendar'
import { appTitle, pageSubtitle } from '../utils/consts'
import { formatAs } from '../utils/formatDate'
import { stripProtocol } from '../utils/urls'

const Index = () => {
  // make this read random showtime from axios call
  const showtime = {
    cinema: { id: null, name: 'random cinema name' },
    startTime: new Date(),
    movie: {
      title: 'random movie',
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
          <img
            src={stripProtocol(showtime.movie.poster)}
            alt={showtime.movie.title}
          />
        </picture>
      </section>
    </>
  )
}

export default Index
