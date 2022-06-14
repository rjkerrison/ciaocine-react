import { stripProtocol } from '../utils/urls'
import PopupLink from './shared/PopupLink'

const MovieHeading = ({ title, poster, slug }) => {
  return (
    <>
      <PopupLink to={`/movies/${slug}`} className='movie-heading'>
        <h3>{title}</h3>
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
