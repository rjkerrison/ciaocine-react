import React from 'react'
import { formatAs } from '../../utils/formatDate'

const SidebarTime = ({ time, gridRowStart }) => {
  return (
    <div
      style={{
        gridRowStart,
        gridRowEnd: 'span 4',
        gridColumn: 1,
        padding: '0.25rem',
        color: 'white',
        borderTop: 'white solid 1px',
      }}
    >
      {formatAs.time(time)}
    </div>
  )
}

export default SidebarTime
