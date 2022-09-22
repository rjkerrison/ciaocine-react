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
  const posterToShow = useMemo(
    () => stripProtocol(images?.poster ?? poster),
    [images?.poster, poster]
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

      <picture className='poster' title={title}>
        <PopupLink to={`/movies/${slug}`}>
          <img src={posterToShow} alt={title} />
        </PopupLink>
      </picture>
    </>
  )
}

export default MovieHeading
