import { useContext, useMemo } from 'react'
import { CalendarContext } from '../../../context/CalendarContext'
import CalendarEntryCard from './CalendarEntryCard'
import { endsBefore, startsAfter } from './utils'

const Showtimes = ({ showtimes, indexOffset }) => {
  const { selectedShowtimeIds } = useContext(CalendarContext)

  const filteredShowtimes = useMemo(() => {
    return showtimes.filter((showtime) => {
      if (selectedShowtimeIds.includes(showtime._id)) {
        return true
      }
      const isOutsideSelectedRuntimes = selectedShowtimeIds.every((id) => {
        const selectedShowtime = showtimes.find((s) => s._id === id)

        if (!selectedShowtime) {
          // showtime is not in this calendar, so ignore it
          return true
        }

        return (
          startsAfter(showtime, selectedShowtime) ||
          endsBefore(showtime, selectedShowtime)
        )
      })
      return isOutsideSelectedRuntimes
    })
  }, [showtimes, selectedShowtimeIds])

  return filteredShowtimes.map((showtime) => (
    <CalendarEntryCard
      key={showtime._id}
      indexOffset={indexOffset}
      {...showtime}
    />
  ))
}

export default Showtimes
