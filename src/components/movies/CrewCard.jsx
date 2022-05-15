const CrewCard = ({ title, label }) => {
  if (!label) {
    return <></>
  }

  return (
    <li>
      <h4>{title}</h4>
      <p>{label}</p>
    </li>
  )
}

export default CrewCard
