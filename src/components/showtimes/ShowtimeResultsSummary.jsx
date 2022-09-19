import { useContext, useMemo } from 'react'
import { MetadataContext } from '../../context/MetadataContext'
import { formatAs } from '../../utils/formatDate'

const ShowtimeResultsSummary = ({ movies, searchDate }) => {
  const { metadata } = useContext(MetadataContext)
  const results = useMemo(() => {
    return movies.reduce(
      (prev, cur) => {
        if (metadata.watches.includes(cur.movie.slug)) {
          prev.watched++
        } else if (metadata.wants.includes(cur.movie.slug)) {
          prev.want++
        } else if (metadata.dismisses.includes(cur.movie.slug)) {
          prev.dismissed++
        } else {
          prev.other++
        }
        return prev
      },
      {
        watched: 0,
        want: 0,
        dismissed: 0,
        other: 0,
      }
    )
  }, [metadata, movies])

  return (
    <>
      <p>
        Il y a {movies.length} films avec des séances le{' '}
        {formatAs.weekdayDate(searchDate)} qui satisfait vos filtres.
      </p>
      <p>
        Dont {results.watched} vu, {results.want} envie de voir,{' '}
        {results.dismissed} dismissed, et {results.other} autres.
      </p>
    </>
  )
}

export default ShowtimeResultsSummary
