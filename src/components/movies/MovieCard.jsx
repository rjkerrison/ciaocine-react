import MovieHeading from '../MovieHeading'
import MovieShowtimes from './MovieShowtimes'

const MovieCard = ({ slug, title, ...movie }) => {
  const { showtimes, pastShowtimeCount, ...enhancedMovie } = {
    ...movie,
    showDate: true,
  }

  return (
    <>
      <MovieHeading {...enhancedMovie} title={title} slug={slug} />
      {pastShowtimeCount > 0 && (
        <p>
          {pastShowtimeCount} past showtime{pastShowtimeCount > 1 && 's'}{' '}
          hidden.
        </p>
      )}
      {showtimes.length > 0 && (
        <MovieShowtimes showtimes={showtimes} movie={enhancedMovie} />
      )}
    </>
  )
}

export default MovieCard
