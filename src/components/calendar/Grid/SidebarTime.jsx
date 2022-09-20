import { formatAs } from '../../../utils/formatDate'

import './SidebarTime.scss'

const SidebarTime = ({ time, gridRowStart }) => {
  return (
    <div className='sidebar-time' style={{ gridRowStart }}>
      {formatAs.time(time)}
    </div>
  )
}

export default SidebarTime
