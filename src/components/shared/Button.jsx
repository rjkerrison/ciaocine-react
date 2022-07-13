const Button = ({ isActive, classes = [], onClick, label, children }) => {
  const className = [
    ...classes,
    'ciaocine-input',
    isActive ? 'selected' : '',
  ].join(' ')
  return (
    <button className={className} onClick={onClick}>
      {children || label}
    </button>
  )
}

export default Button
