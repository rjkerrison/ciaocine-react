import { Link } from 'react-router-dom'
import FavouriteCinema from '../FavouriteCinema'

import './CinemaHeader.scss'

const CinemaHeader = (cinema) => {
  return (
    <header className='cinema-header'>
      <h2>
        <Link to={`/cinemas/${cinema.slug}`}>{cinema.name}</Link>
      </h2>
      <div className='address'>
        <p>
          {cinema.address} {cinema.zipcode} {cinema.city}
        </p>
        <FavouriteCinema cinema={cinema} />
      </div>
      <ul className='member-card-list'>
        {cinema.member_cards?.map((card) => (
          <li className='member-card' key={card.code}>
            {card.label}
          </li>
        ))}
      </ul>
    </header>
  )
}

export default CinemaHeader
