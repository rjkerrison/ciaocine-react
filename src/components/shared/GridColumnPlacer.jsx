import './GridColumnPlacer.scss'

const GridColumnPlacer = ({ children, rowStart, rowEndSpan }) => {
  return (
    <div
      className='grid-column-placer'
      style={{
        gridRowStart: rowStart,
        gridRowEnd: `span ${rowEndSpan}`,
      }}
    >
      {children}
    </div>
  )
}

export default GridColumnPlacer
