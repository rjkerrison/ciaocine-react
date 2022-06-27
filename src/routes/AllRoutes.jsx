import { Navigate, Route, Routes } from 'react-router-dom'

import Index from './pages/Index'
import Cinemas from './pages/Cinemas'
import Showtimes from './pages/Showtimes'
import Layout from './pages/Layout'
import Login from './pages/auth/LoginPage'
import Signup from './pages/auth/Signup'
import Calendar from './pages/Calendar'
import CalendarSingleDay from './pages/CalendarSingleDay'
import Cinema from './pages/Cinema'
import NearbySoon from './pages/NearbySoon'

const AllRoutes = ({ location, ...state }) => {
  const calendarRoutes = (
    <>
      <Route path='' element={<Calendar />} />
      <Route path=':year/:month/:date' element={<CalendarSingleDay />} />
    </>
  )

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' index element={<Index />} />
        <Route path='/nearby' index element={<NearbySoon />} />
        <Route path='/cinemas' index element={<Cinemas />} />
        <Route path='/cinemas/:cinemaIdOrSlug' element={<Cinema />}>
          <Route path=':year/:month/:date' />
        </Route>
        <Route path='/calendar'>
          {/* I haven't found a better way to make early routing optional */}
          {calendarRoutes}
          <Route path=':username'>{calendarRoutes}</Route>
        </Route>
        <Route
          path='/calendar/:year/:month/:date'
          element={<CalendarSingleDay />}
        >
          <Route path=':username' />
        </Route>
        <Route
          path='/movies/:movieId'
          element={
            <Navigate
              state={{
                backgroundLocation: {
                  pathname: '/showtimes',
                  search: location.search,
                },
              }}
              to={location}
            />
          }
        />
        <Route path='/showtimes' element={<Showtimes />}>
          <Route path=':year/:month/:date' />
        </Route>
        <Route path='/auth'>
          <Route path='login' element={<Login {...state} />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AllRoutes
