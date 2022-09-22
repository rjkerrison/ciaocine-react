import { useContext, useMemo } from 'react'
import { MetadataContext } from '../../context/MetadataContext'
import './MovieSummary.scss'

import MovieHeading from '../MovieHeading'

const MovieSummary = ({
  classes: propsClasses = [],
  movie,
  children,
  rowSpan,
}) => {
  const { metadata } = useContext(MetadataContext)

  const classes = useMemo(() => {
    const memoClasses = [...propsClasses]
    if (metadata.wants.includes(movie.slug)) {
      memoClasses.push('wanted')
    }
    if (metadata.watches.includes(movie.slug)) {
      memoClasses.push('watched')
    }
    if (metadata.dismisses.includes(movie.slug)) {
      memoClasses.push('dismissed')
    }
    return memoClasses
  }, [metadata, movie.slug, propsClasses])

  return (
    <div
      className={`movie-summary ${classes?.join(' ')}`}
      style={{
        gridRow: rowSpan && `span ${rowSpan}`,
      }}
    >
      <MovieHeading {...movie} />
      {children}
    </div>
  )
}

export default MovieSummary
