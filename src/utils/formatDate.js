const formatDate = (datetime, targetFormat) => {
  if (typeof datetime === 'string') {
    datetime = new Date(datetime)
  }

  try {
    let { format } = Intl.DateTimeFormat('fr-FR', targetFormat)
    return format(datetime)
  } catch (error) {
    console.error('uhohohohoh', datetime, targetFormat)
    return datetime
  }
}

const timeFormat = {
  hour: 'numeric',
  minute: 'numeric',
  // unfortunately the data we have is without timezone
  // and we cannot afford to convert it, so we have to print UTC
  timeZone: 'UTC',
}

const dateFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const dateMonthFormat = {
  month: 'long',
  day: 'numeric',
}

const weekdayDateFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}

const weekdayDateMonthFormat = {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}

const shortDateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

const getFormatter = (format) => (date) => formatDate(date, format)

const time = getFormatter(timeFormat)
const date = getFormatter(dateFormat)
const dateMonth = getFormatter(dateMonthFormat)
const weekdayDate = getFormatter(weekdayDateFormat)

export const formatAs = {
  time,
  date,
  dateMonth,
  weekdayDate,
}

export const formats = {
  timeFormat,
  dateFormat,
  dateMonthFormat,
  shortDateFormat,
  weekdayDateFormat,
  weekdayDateMonthFormat,
}

export default formatDate
