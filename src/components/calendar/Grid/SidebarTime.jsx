import { formatAs } from '../../../utils/formatDate'

import './SidebarTime.scss'

const SidebarTime = ({ time, gridRowStart: start, endSpan }) => {
  return (
    <div
      className='sidebar-time'
      style={{ '--start': start, '--endSpan': endSpan }}
    >
      {formatAs.time(time)}
    </div>
  )
}

export default SidebarTime
