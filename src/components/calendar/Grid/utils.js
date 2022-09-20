import { formatAs } from '../../../utils/formatDate'

const getEndtime = (showtime) => {
  const startTimeMs = new Date(showtime.startTime) * 1
  const runtimeMs = showtime.movie.runtime * 1000
  const endtimeMs = startTimeMs + runtimeMs
  return new Date(endtimeMs)
}

export const startsAfter = (a, b) => {
  return new Date(a.startTime) >= getEndtime(b)
}

export const endsBefore = (a, b) => {
  return getEndtime(a) <= new Date(b.startTime)
}

export const summariseShowtimes = (showtimes) => {
  const earliestStart = new Date(showtimes[0].startTime)

  const latestFinish = showtimes.reduce((latest, showtime) => {
    const endtime = getEndtime(showtime)

    if (endtime > latest) {
      return endtime
    }

    return latest
  }, earliestStart)

  const creneaux =
    (1 +
      formatAs.fifteenMinuteIndex(latestFinish) -
      formatAs.fifteenMinuteIndex(earliestStart) +
      96) %
    96

  return { earliestStart, latestFinish, creneaux }
}
