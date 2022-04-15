import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/consts'

const Cinemas = () => {
  const [cinemas, setCinemas] = useState([])

  const getCinemas = async () => {
    const {
      data: { cinemas },
    } = await axios({
      baseURL: API_URL,
      url: '/cinemas',
    })
    setCinemas(cinemas)
  }

  useEffect(() => {
    getCinemas()
  }, [])

  return (
    <section>
      <ul className='cinema-list'>
        {cinemas.map((cinema) => (
          <li className='cinema'>
            <h2>
              <Link to={`/cinema/${cinema._id}`}>{cinema.name}</Link>
            </h2>

            <div className='address'>
              <p>
                {cinema.address} {cinema.zipcode} {cinema.city}
              </p>
              {/* {> favouriteCinema cinema=this liked=liked} */}
            </div>
            <ul className='member-card-list'>
              {cinema.member_cards?.map((card) => (
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

export default Cinemas
