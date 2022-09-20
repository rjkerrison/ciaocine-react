import './GridPlacer.scss'

const GridPlacer = ({ children, start, endSpan }) => {
  return (
    <div
      className={`grid-placer`}
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
