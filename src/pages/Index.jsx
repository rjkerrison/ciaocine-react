import React from 'react'
import { Link } from 'react-router-dom'
import { appTitle, pageSubtitle } from '../utils/consts'

const Index = () => {
  return (
    <>
      <section className='splash'>
        <h1>{appTitle}</h1>
        <p>{pageSubtitle}</p>
      </section>
      <section className='planning'>
        <h2>Planning a cinema trip?</h2>
        <p>
          We make it easy! If you're free from 18h and looking for cinemas in
          Rive Gauche, our showtime search lets you do just that.
        </p>
        <Link to={`/movies?fromHour=18`} className='big-link'>
          See tonight's showtimes
        </Link>
      </section>
    </>
  )
}

export default Index
