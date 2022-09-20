import { useMemo } from 'react'
import { summariseShowtimes } from './utils'
import { formatAs } from '../../../utils/formatDate'

import './Grid.scss'

import Hours from './Hours'
import Showtimes from './Showtimes'

const Grid = ({ showtimes }) => {
  const { earliestStart, latestFinish, creneaux } = useMemo(() => {
    return summariseShowtimes(showtimes)
  }, [showtimes])

  const startingHours = useMemo(() => {
    const startTime = new Date(earliestStart)

    const hours = []
    let hour = startTime

    while (hour < latestFinish && hours.length < 24) {
      hours.push(hour)

      const nextHour = new Date(hour)
      nextHour.setMinutes(0)
      nextHour.setHours(hour.getHours() + 1)
      hour = nextHour
    }

    return hours
  }, [earliestStart, latestFinish])

  const indexOffset = useMemo(
    () => formatAs.fifteenMinuteIndex(startingHours[0]) - 1,
    [startingHours]
  )

  return (
    <div className='CalendarGrid' style={{ '--row-count': creneaux }}>
      <Hours {...{ startingHours, indexOffset }} />
      <Showtimes {...{ showtimes, indexOffset }} />
    </div>
  )
}

export default Grid
