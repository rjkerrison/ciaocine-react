import { useLocation } from 'react-router-dom'

import AllRoutes from './routes/AllRoutes'
import PopupRoutes from './routes/PopupRoutes'

function App() {
  const location = useLocation()

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  const state = location.state

  return (
    <div className='App'>
      <AllRoutes location={state?.backgroundLocation || location} {...state} />
      {state?.backgroundLocation && (
        <PopupRoutes backgroundLocation={state.backgroundLocation} />
      )}
    </div>
  )
}

export default App
