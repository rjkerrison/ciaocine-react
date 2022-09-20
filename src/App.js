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
import MoviePopupInner from './components/movies/MoviePopupInner'
import Popup from './components/Popup'
import Calendar from './pages/calendar'
import Cinema from './pages/Cinema'
import NearbySoon from './pages/NearbySoon'
import Movies from './pages/Movies'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  const state = location.state

  return (
    <div className='App'>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<Layout />}>
          <Route path='*' element={<NotFound />} />
          <Route path='/' index element={<Index />} />
          <Route path='/nearby' index element={<NearbySoon />} />
          <Route path='/cinemas' index element={<Cinemas />} />
          <Route path='/cinemas/:cinemaIdOrSlug' element={<Cinema />}>
            <Route path=':year/:month/:date' />
          </Route>
          <Route path='/calendar'>
            <Route path='' element={<Calendar.UsernameRedirect />} />
            <Route path=':username'>
              <Route path='' element={<Calendar.Today />} />
              <Route
                path=':year/:month/:date'
                element={<Calendar.RoutedDate />}
              />
            </Route>
          </Route>
          <Route path='/search/movies' index element={<Movies />} />
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
            <Route path='signup' element={<Signup {...state} />} />
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
            <Route path='auth/login' element={<Login {...state} />} />
            <Route path='auth/signup' element={<Signup {...state} />} />
          </Route>
        </Routes>
      )}
    </div>
  )
}

export default App
