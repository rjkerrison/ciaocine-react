import './Icon.scss'

const Icon = ({ src, alt }) => {
  return (
    <span className='icon'>
      <img src={src} alt={alt || 'icon'} />
    </span>
  )
}

export default Icon
