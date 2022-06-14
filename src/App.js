import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Index from './pages/Index'
import Cinemas from './pages/Cinemas'
import Showtimes from './pages/Showtimes'
import Layout from './pages/Layout'
import Login from './pages/auth/LoginPage'
import Signup from './pages/auth/Signup'
import Calendar from './pages/Calendar'
import MoviePopupInner from './components/movies/MoviePopupInner'
import Popup from './components/Popup'
import CalendarSingleDay from './pages/CalendarSingleDay'
import Cinema from './pages/Cinema'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  const state = location.state

  const calendarRoutes = (
    <>
      <Route path='' element={<Calendar />} />
      <Route path=':year/:month/:date' element={<CalendarSingleDay />} />
    </>
  )

  return (
    <div className='App'>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<Layout />}>
          <Route path='/' index element={<Index />} />
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
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path='/'
            element={
              <Popup
                active={!!state?.backgroundLocation}
                close={() => navigate(state?.backgroundLocation)}
              />
            }
          >
            <Route path='movies/:movieId' element={<MoviePopupInner />} />
            <Route path='auth/login' element={<Login />} />
          </Route>
        </Routes>
      )}
    </div>
  )
}

export default App
