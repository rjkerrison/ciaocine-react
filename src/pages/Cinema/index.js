const Index = () => {
  // to get from axios
  const cinemas = []

  return (
    <section>
      <ul className='cinema-list'>
        {cinemas.map((cinema) => (
          <li className='cinema'>
            <h2>
              <a href={`/cinema/${cinema._id}`}>{cinema.name}</a>
            </h2>

            <div className='address'>
              <p>
                {cinema.address} {cinema.zipcode} {cinema.city}
              </p>
              {/* {> favouriteCinema cinema=this liked=liked} */}
            </div>
            <ul className='member-card-list'>
              {cinema.memberCards.map((card) => (
                <li className='member-card' data-code={card.code}>
                  {card.label}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Index
