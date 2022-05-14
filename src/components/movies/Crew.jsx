import './crew.scss'

const CrewCard = ({ jobTitle, people }) => {
  if (!people) {
    return <></>
  }

  return (
    <li key={jobTitle}>
      <h3>{jobTitle}</h3>
      <p>{people.map(({ name }) => name).join(', ')}</p>
    </li>
  )
}

const Crew = ({ crew }) => {
  const { Director: director, 'Director of Photography': dop, ...rest } = crew

  return (
    <ul className='crew'>
      <CrewCard jobTitle='Director' people={director} />
      <CrewCard jobTitle='Director of Photography' people={dop} />
      {Object.entries(rest).map(([jobTitle, people]) => (
        <CrewCard key={jobTitle} jobTitle={jobTitle} people={people} />
      ))}
    </ul>
  )
}

export default Crew
