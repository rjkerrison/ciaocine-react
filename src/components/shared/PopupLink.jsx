import { Link, useLocation } from 'react-router-dom'

const PopupLink = ({ to, children, ...props }) => {
  const location = useLocation()
  const query = location.search

  return (
    <Link
      to={to + query}
      state={{
        backgroundLocation: location,
        ...location.state,
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default PopupLink
