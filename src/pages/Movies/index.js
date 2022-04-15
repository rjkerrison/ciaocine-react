import React from 'react'
import MovieHeading from '../../components/MovieHeading'

const weekdaydate = (d) => d?.toString()

const Movies = ({ chosenDate }) => {
  const movies = []

  return (
    <section className='movies-section'>
      <h2>{weekdaydate(chosenDate)}</h2>
      <p>
        {movies.length} films are showing on {weekdaydate(chosenDate)} matching
        your filters
      </p>
      <nav>
        {/* {{> moviesFilters label='sur le' urls=calendarUrls}}
  {{> moviesFilters label='à partir de' urls=hoursUrls}}
  {{> moviesFilters label='+ de filtres' urls=filtersUrls}} */}
      </nav>
      <div className='movies'>
        {movies.map((movie) => (
          <div className='movie overlay-container expander-container'>
            <MovieHeading movie={movie} />
            {/* <MovieShowtimes showtimes={showtimes} /> */}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Movies
