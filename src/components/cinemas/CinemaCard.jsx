import React from 'react'
import { Link } from 'react-router-dom'
import FavouriteCinema from '../FavouriteCinema'

import './CinemaCard.scss'

const CinemaCard = (cinema) => {
  return (
    <>
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
    </>
  )
}

export default CinemaCard
