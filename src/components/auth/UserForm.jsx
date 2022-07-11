import { useState } from 'react'
import Input from '../shared/forms/Input'
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
        <label htmlFor='username'>Username</label>
        <Input
          id='username'
          type='text'
          name='username'
          value={username}
          onChange={handleUsername}
        />
      </div>

      <div className='label-input-group'>
        <label htmlFor='password'>Password</label>
        <Input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />
      </div>
      <div className='label-input-group'>
        <Input type='submit' value='Login' />
      </div>
    </form>
  )
}

export default UserForm
