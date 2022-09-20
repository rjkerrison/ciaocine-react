import './GridPlacer.scss'

const GridPlacer = ({ children, start, endSpan, orientation = 'column' }) => {
  return (
    <div
      className={`grid-${orientation}-placer`}
      style={{
        '--start': start,
        '--endSpan': endSpan,
      }}
    >
      {children}
    </div>
  )
}

export default GridPlacer
