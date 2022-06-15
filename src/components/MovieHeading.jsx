import { stripProtocol } from '../utils/urls'
import PopupLink from './shared/PopupLink'

import './MovieHeading.scss'

const MovieHeading = ({ title, poster, slug, castingShort }) => {
  return (
    <>
      <PopupLink to={`/movies/${slug}`} className='movie-heading'>
        <h3>{title}</h3>
        {castingShort && <p>de {castingShort?.directors}</p>}
      </PopupLink>
      <picture className='poster' title={title}>
        <PopupLink to={`/movies/${slug}`}>
          <img src={stripProtocol(poster)} alt={title} />
        </PopupLink>
      </picture>
    </>
  )
}

export default MovieHeading
