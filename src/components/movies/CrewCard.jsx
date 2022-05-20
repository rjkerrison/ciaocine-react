const CrewCard = ({ title, label }) => {
  if (!label) {
    return <></>
  }

  return (
    <div className='crew-card'>
      <h4>{title}</h4>
      <p>{label}</p>
    </div>
  )
}

export default CrewCard
