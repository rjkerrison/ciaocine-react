import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const AddToCalendar = ({ showtimeId }) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    return <></>
  }

  return (
    <button class='add-to-calendar' data-showtime={showtimeId}>
      +<span class='sr-only'>Add this to your calendar</span>
    </button>
  )
}

export default AddToCalendar
