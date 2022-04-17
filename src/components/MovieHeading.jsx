const MovieHeading = ({ title, poster, _id, show }) => {
  return (
    <>
      <div className='movie-heading'>
        <h3>{title}</h3>
        <button className='round' onClick={() => show(_id)}>
          i
        </button>
      </div>
      <picture className='poster'>
        <img src={poster} alt={title} />
      </picture>
    </>
  )
}

export default MovieHeading
