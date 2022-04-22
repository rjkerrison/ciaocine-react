import { Link, useLocation } from 'react-router-dom'

const PopupLink = ({ to, children }) => {
  const location = useLocation()
  const query = location.search

  return (
    <Link to={to + query} state={{ backgroundLocation: location }}>
      {children}
    </Link>
  )
}

export default PopupLink
