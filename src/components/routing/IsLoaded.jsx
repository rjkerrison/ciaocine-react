import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import LoadingSpinner from '../shared/LoadingSpinner'

const IsLoaded = ({ children }) => {
  const { isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <LoadingSpinner />
  }
  return children
}

export default IsLoaded
