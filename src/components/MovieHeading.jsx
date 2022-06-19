import { stripProtocol } from '../utils/urls'
import PopupLink from './shared/PopupLink'

import './MovieHeading.scss'
import { formatAs } from '../utils/formatDate'

const convertToSlug = (text) => {
  return text
    .toString() // Cast to string
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .replace(/[^-\w\s]+/g, '') // Remove all non-word chars
    .trim() // Remove whitespace from both sides of a string
    .replace(/[-\s]+/g, '-') // Replace spaces with -
}

const MovieHeading = ({
  title,
  poster,
  slug,
  originalTitle,
  castingShort,
  releaseDate,
  allocineId,
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
        <ul className='external-links'>
          <li>
            <a
              href={`https://www.allocine.fr/film/fichefilm_gen_cfilm=${allocineId}.html`}
              target='_blank'
              rel='noreferrer'
            >
              Allocine
            </a>
          </li>
          <li>
            <a
              href={`https://letterboxd.com/film/${convertToSlug(
                originalTitle || title
              )}`}
              target='_blank'
              rel='noreferrer'
            >
              Letterboxd
            </a>
          </li>
        </ul>
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
