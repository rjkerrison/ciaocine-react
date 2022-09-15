const Button = ({ isActive, classes = [], onClick, label, children }) => {
  const className = [
    ...classes,
    'movies-filter',
    isActive ? 'selected' : '',
  ].join(' ')
  return (
    <button className={className} onClick={onClick}>
      {label}
      {children}
    </button>
  )
}

export default Button
