const MovieHeading = ({ title, poster }) => {
  return (
    <>
      <h3 class='movie-heading'>{title}</h3>
      <picture class='poster'>
        <img src={poster} alt={title} />
      </picture>
    </>
  )
}

export default MovieHeading
