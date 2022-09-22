import PopupLink from './shared/PopupLink'
import { stripProtocol } from '../utils/urls'
import { formatAs } from '../utils/formatDate'

import './MovieHeading.scss'
import { useMemo } from 'react'

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
        <PopupLink to={`/movies/${slug}`}>
          <h3>
            <span>{title}</span>
            {secondTitle && secondTitle !== title && (
              <span className='alternative-title'>{secondTitle}</span>
            )}
          </h3>
          <p>
            {castingShort && <>de {castingShort?.directors} </>}
            <span className='year'>
              {formatAs.yearMonthDate(releaseDate).year}
            </span>
          </p>
        </PopupLink>
      </div>

      <PopupLink to={`/movies/${slug}`}>
        <picture className='poster' title={title}>
          {posters.map((poster) => (
            <source key={poster} srcSet={poster} />
          ))}
          <img src={posters[0]} alt={title} />
        </picture>
      </PopupLink>
    </>
  )
}

export default MovieHeading
