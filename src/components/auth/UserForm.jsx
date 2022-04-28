import { useState } from 'react'
import './UserForm.css'

const UserForm = ({ submitUserInfo, submitLabel }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    submitUserInfo({ username, password })
  }

  return (
    <form onSubmit={onSubmit} className='user-form'>
      <div className='label-input-group'>
        <label>Username:</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleUsername}
        />
      </div>

      <div className='label-input-group'>
        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />
      </div>

      <button type='submit'>{submitLabel}</button>
    </form>
  )
}

export default UserForm
