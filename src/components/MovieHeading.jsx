import PopupLink from './shared/PopupLink'
import { stripProtocol } from '../utils/urls'
import { formatAs } from '../utils/formatDate'

import './MovieHeading.scss'

const MovieHeading = ({
  title,
  poster,
  slug,
  originalTitle,
  castingShort,
  releaseDate,
}) => {
  return (
    <>
      <div className='movie-heading'>
        <PopupLink to={`/movies/${slug}`}>
          <h3>
            {title} ({formatAs.yearMonthDate(releaseDate).year})
            {originalTitle && originalTitle !== title && (
              <span> / {originalTitle}</span>
            )}
          </h3>
          {castingShort && <p>de {castingShort?.directors}</p>}
        </PopupLink>
      </div>

      <picture className='poster' title={title}>
        <PopupLink to={`/movies/${slug}`}>
          <img src={stripProtocol(poster)} alt={title} />
        </PopupLink>
      </picture>
    </>
  )
}

export default MovieHeading
