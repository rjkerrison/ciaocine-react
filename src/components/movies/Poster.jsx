import React from 'react'

const Poster = ({ title, posters }) => {
  return (
    <picture title={title}>
      {posters.map((poster) => (
        <source key={poster} srcSet={poster} />
      ))}
      <img src={posters[0]} alt={title} />
    </picture>
  )
}

export default Poster
