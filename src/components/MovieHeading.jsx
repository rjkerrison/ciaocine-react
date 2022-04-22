import { stripProtocol } from '../utils/urls'
import PopupLink from './shared/PopupLink'

const MovieHeading = ({ title, poster, _id, show }) => {
  return (
    <>
      <div className='movie-heading'>
        <PopupLink to={`/movies/${_id}`}>
          <h3>{title}</h3>
        </PopupLink>
        <button className='round' onClick={() => show(_id)}>
          i
        </button>
      </div>
      <picture className='poster'>
        <img src={stripProtocol(poster)} alt={title} />
      </picture>
    </>
  )
}

export default MovieHeading
