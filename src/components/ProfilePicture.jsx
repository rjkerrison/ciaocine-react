import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProfilePicture = () => {
  const { user } = useContext(AuthContext)

  return (
    <picture>
      <img src={user.profilePictureUrl} alt={user.username} />
    </picture>
  )
}

export default ProfilePicture
