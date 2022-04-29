import Toggle from './Toggle'

const ViewSwitches = ({ setViewParams, viewParams }) => {
  return (
    <Toggle
      name={'isTiles'}
      updateFilter={() => setViewParams((s) => ({ ...s, isTiles: !s.isTiles }))}
      values={viewParams}
      label={viewParams.isTiles ? 'Tiles' : 'Info'}
      classes={['top-level']}
    />
  )
}

export default ViewSwitches
