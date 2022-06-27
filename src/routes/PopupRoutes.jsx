import { Route, Routes, useNavigate } from 'react-router-dom'

import MoviePopupInner from '../components/movies/MoviePopupInner'
import Popup from '../components/Popup'
import LoginPage from '../pages/auth/LoginPage'

const PopupRoutes = ({ backgroundLocation }) => {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Popup
            active={!!backgroundLocation}
            close={() => navigate(backgroundLocation)}
          />
        }
      >
        <Route path='movies/:movieId' element={<MoviePopupInner />} />
        <Route path='auth/login' element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default PopupRoutes
