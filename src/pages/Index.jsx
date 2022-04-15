import React from 'react'
import AddToCalendar from '../components/AddToCalendar'

const time = (a) => a.toString()
const date = time

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
          <a href={`/cinema/${showtime.cinema.id}`}>{showtime.cinema.name}</a>{' '}
          at <strong>{time(showtime.startTime)}</strong>
          on <strong>{date(showtime.startTime)}</strong>?
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
