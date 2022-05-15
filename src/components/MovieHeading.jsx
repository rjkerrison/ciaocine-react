import { stripProtocol } from '../utils/urls'
import PopupLink from './shared/PopupLink'

const MovieHeading = ({ title, poster, _id }) => {
  return (
    <>
      <PopupLink to={`/movies/${_id}`} className='movie-heading'>
        <h3>{title}</h3>
      </PopupLink>
      <picture className='poster' title={title}>
        <PopupLink to={`/movies/${_id}`}>
          <img src={stripProtocol(poster)} alt={title} />
        </PopupLink>
      </picture>
    </>
  )
}

export default MovieHeading
