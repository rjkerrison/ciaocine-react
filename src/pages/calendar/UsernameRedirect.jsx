import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { AuthContext } from '../../context/AuthContext'
import { getCalendarRoute } from '../../utils/routeHelpers'

const UsernameRedirect = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isLoggedIn) {
    return (
      <Navigate to='/auth/login' state={{ redirect: getCalendarRoute() }} />
    )
  } else {
    return (
      <Navigate
        to={getCalendarRoute({ username: user.username })}
        replace={true}
      />
    )
  }
}

export default UsernameRedirect
