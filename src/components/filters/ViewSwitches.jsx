import Toggle from './Toggle'

const ViewSwitches = ({ setViewParams, viewParams }) => {
  return (
    <div className='movies-filters-menu'>
      <Toggle
        name={'isTiles'}
        updateFilter={() =>
          setViewParams((s) => ({ ...s, isTiles: !s.isTiles }))
        }
        values={viewParams}
        label={viewParams.isTiles ? 'tiles!' : 'info'}
      />
    </div>
  )
}

export default ViewSwitches
