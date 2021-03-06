import './crew.scss'
import CrewCard from './CrewCard'

const Cast = ({ cast }) => {
  return (
    <>
      <h3>Casting</h3>
      <ul className='crew'>
        {cast.slice(0, 5).map(({ id, name, character }) => (
          <CrewCard key={id} title={name} label={character} />
        ))}
      </ul>
    </>
  )
}

export default Cast
