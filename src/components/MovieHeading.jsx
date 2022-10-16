import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { stripProtocol } from '../utils/urls'
import { formatAs } from '../utils/formatDate'

import './MovieHeading.scss'

const MovieHeading = ({
  title,
  poster,
  images,
  slug,
  originalTitle,
  castingShort,
  releaseDate,
  externalIdentifiers,
}) => {
  const posters = useMemo(
    () =>
      [images?.poster, poster, images?.backdrop]
        .filter((x) => x)
        .map(stripProtocol),
    [images, poster]
  )

  const secondTitle = externalIdentifiers?.tmdb?.title || originalTitle

  return (
    <>
      <div className='movie-heading'>
        <Link to={`/movies/${slug}`}>
          <h3>
            <span>{title}</span>
            {secondTitle && secondTitle !== title && (
              <span className='alternative-title'>{secondTitle}</span>
            )}
          </h3>
          <p>
            {castingShort && castingShort.directors && (
              <>de {castingShort.directors} </>
            )}
            {releaseDate && (
              <span className='year'>
                {formatAs.yearMonthDate(releaseDate).year}
              </span>
            )}
          </p>
        </Link>
      </div>

      <div className='poster'>
        <Link to={`/movies/${slug}`}>
          <picture title={title}>
            {posters.map((poster) => (
              <source key={poster} srcSet={poster} />
            ))}
            <img src={posters[0]} alt={title} />
          </picture>
        </Link>
      </div>
    </>
  )
}

export default MovieHeading
