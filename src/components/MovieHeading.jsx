const MovieHeading = ({ title, poster }) => {
  return (
    <>
      <h3 className='movie-heading'>{title}</h3>
      <picture className='poster'>
        <img src={poster} alt={title} />
      </picture>
    </>
  )
}

export default MovieHeading
