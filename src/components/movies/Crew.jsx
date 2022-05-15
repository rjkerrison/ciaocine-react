import './crew.scss'
import CrewCard from './CrewCard'

const Crew = ({ crew }) => {
  const { Director: director, 'Director of Photography': dop, ...rest } = crew

  return (
    <>
      <h3>Crew</h3>
      <ul className='crew'>
        <CrewCard
          title='Director'
          label={director?.map(({ name }) => name).join(', ')}
        />
        <CrewCard
          title='Director of Photography'
          label={dop?.map(({ name }) => name).join(', ')}
        />
        {Object.entries(rest).map(([title, people]) => (
          <CrewCard
            key={title}
            title={title}
            label={people?.map(({ name }) => name).join(', ')}
          />
        ))}
      </ul>
    </>
  )
}

export default Crew
