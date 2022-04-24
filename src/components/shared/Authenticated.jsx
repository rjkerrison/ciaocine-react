import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const AuthenticatedComponent = ({ component: Component, ...props }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading || !isLoggedIn) {
    return <></>
  }

  return <Component {...props} />
}

const Authenticated = (component) => {
  return (props) => <AuthenticatedComponent {...props} component={component} />
}

export default Authenticated
