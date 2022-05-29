const sanitiseDate = (datetime) => {
  if (!datetime) {
    return new Date()
  } else if (typeof datetime === 'string' || typeof datetime === 'number') {
    return new Date(datetime)
  }
  return datetime
}

const formatDate = (datetime, targetFormat) => {
  datetime = sanitiseDate(datetime)
  try {
    let { format } = Intl.DateTimeFormat('fr-FR', targetFormat)
    return format(datetime, { timeZone: 'Europe/Paris' })
  } catch (error) {
    console.error('uhohohohoh', datetime, targetFormat)
    return datetime
  }
}

const timeFormat = {
  hour: 'numeric',
  minute: 'numeric',
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
const fifteenMinuteIndex = (datetime) => {
  try {
    datetime = sanitiseDate(datetime)
    return datetime.getHours() * 4 + Math.floor(datetime.getMinutes() / 15)
  } catch (error) {
    console.log('errored with datetime', datetime, error)
    return 1
  }
}

const yearMonthDate = (datetime) => {
  datetime = sanitiseDate(datetime)

  return {
    year: datetime.getFullYear(),
    month: datetime.getMonth() + 1,
    date: datetime.getDate(),
  }
}

const routeDate = (datetime) => {
  const { year, month, date } = formatAs.yearMonthDate(datetime)
  return `${year}/${month}/${date}`
}

export const formatAs = {
  time,
  date,
  dateMonth,
  weekdayDate,
  fifteenMinuteIndex,
  yearMonthDate,
  routeDate,
}

export const areSameDay = (date, ymd) => {
  const { year: y1, month: m1, date: d1 } = formatAs.yearMonthDate(date)
  // instead of this, assuming the ymd format, we should cover all cases so that any date-like object is valid
  const { year: y2, month: m2, date: d2 } = ymd
  return y1 === parseInt(y2) && m1 === parseInt(m2) && d1 === parseInt(d2)
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
