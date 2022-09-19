import UserForm from '../../components/auth/UserForm'
import Quote from '../../components/shared/Quote'
import './AuthPage.scss'

const AuthPage = ({
  handleSubmit,
  label,
  message,
  errorMessage,
  alternative,
  quote,
  backdrop,
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        '--backdrop-path': backdrop,
      }}
      className='movie-popup-inner auth-page popup-inner'
    >
      <h1>{label}</h1>
      <p>{message}</p>
      <UserForm submitUserInfo={handleSubmit} submitLabel={label} />
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      {alternative}
      <Quote {...quote} />
    </div>
  )
}

export default AuthPage
