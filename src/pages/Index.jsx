import React from 'react'
import { Link } from 'react-router-dom'
import { appTitle, pageSubtitle } from '../utils/consts'
import { formatAs } from '../utils/formatDate'

const Index = () => {
  return (
    <>
      <section className='splash'>
        <h1>{appTitle}</h1>
        <p>{pageSubtitle}</p>
      </section>
      <section className='planning'>
        <h2>Planning a cinema trip?</h2>
        <p>
          Our planner lets you search for showings on a given day, with a range
          of criteria.
        </p>
        <ul>
          <li>
            <h3>All showings today</h3>
            <p>Find any showing in Paris today</p>
            <Link
              to={`/showtimes/${formatAs.routeDate()}`}
              className='big-link'
            >
              Paris, on {formatAs.dateMonth()}
            </Link>
          </li>
          <li>
            <h3>Tonight, after 18h</h3>
            <p>Not free until after work? You can search tonight</p>
            <Link to={`/showtimes?fromHour=16`} className='big-link'>
              Paris, on {formatAs.dateMonth()}, after 18h
            </Link>
          </li>
          <li>
            <h3>Cinema pass</h3>
            <p>
              If you have a cinema pass such as UGC Illimité, you can limit
              showings to those which are covered by your pass.
            </p>
            <Link to={`/showtimes?ugcIllimite=true`} className='big-link'>
              Tomorrow with UGC Illimité
            </Link>
          </li>
          <li>
            <h3>In the neighbourhood</h3>
            <p>
              Out and about? Find showings that are near you by choosing an
              arrondissement.
            </p>
            <Link to={`/showtimes?arrondissements=75011`} className='big-link'>
              Dans l'onziéme, aujourd'hui
            </Link>
          </li>
          <li>
            <h3>Tight schedule</h3>
            <p>
              If you've only got a small window but you wanna get your movie
              fix, we got you. You can search for screenings starting between
              one hour and another.
            </p>
            <Link to={`/showtimes?fromHour=10&toHour=14`} className='big-link'>
              Starting after 12h, before 14h
            </Link>
          </li>
          <li>
            <h3>By Cinema</h3>
            <p>
              Got a favourite screen? You can check showtimes for your favourite
              cinema. You can even star your favourites so they're always easy
              to find.
            </p>
            <Link to={`/cinemas`} className='big-link'>
              List all cinemas
            </Link>
          </li>
        </ul>
      </section>
      <section className='features planning'>
        <h2>Features</h2>
        <p>
          We're committed to being the best way to find films on the big screen
          in Paris. Just a few of the ways we can help:
        </p>
        <ul>
          <li>
            <h3>Save to calendar</h3>
            <p>
              Save screenings to your own personal shortlist. Sign up and log in
              to use our calendar. You can even share your calendar with
              friends.
            </p>
          </li>
          <li>
            <h3>Synopsis</h3>
            <p>
              Click the name or poster of any movie to get an instant overview,
              with synopsis, cast and crew.
            </p>
          </li>
          <li>
            <h3>Hide movies</h3>
            <p>Hide movies from the search page.</p>
          </li>
          <li>
            <h3>Star cinemas</h3>
            <p>
              Love the comfy seats of a latin quarter theatre, or have a cinema
              right by your flat? Save your favourites, and access their pages
              easier.
            </p>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Index
