const Button = ({ isActive, classes = [], onClick, label }) => {
  const className = [
    ...classes,
    'movies-filter',
    isActive ? 'selected' : '',
  ].join(' ')
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
