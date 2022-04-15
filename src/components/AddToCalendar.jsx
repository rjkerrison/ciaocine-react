import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const AddToCalendar = ({ showtime }) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    return <></>
  }

  return (
    <button class='add-to-calendar' data-showtime={showtime._id}>
      +<span class='sr-only'>Add this to your calendar</span>
    </button>
  )
}

export default AddToCalendar
