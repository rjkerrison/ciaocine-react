// <section class='movies-section'>
//   <h2>
//     {{weekdaydate chosenDate}}
//   </h2>
//    <p>{{movies.length}} films are showing on {{weekdaydate chosenDate}} matching your filters</p>
// <nav>
//   {{> moviesFilters label='sur le' urls=calendarUrls}}
//   {{> moviesFilters label='à partir de' urls=hoursUrls}}
//   {{> moviesFilters label='+ de filtres' urls=filtersUrls}}
// </nav>
// <div class='movies'>
//   {{#each movies}}
//     <div class='movie overlay-container expander-container'>
//       {{> movieHeading movie=movie}}
//       {{> movieShowtimes showtimes=showtimes}}
//     </div>
//   {{/each}}
// </div>
// </section>

import React from 'react'

const Movies = () => {
  return <div>Movies</div>
}

export default Movies
