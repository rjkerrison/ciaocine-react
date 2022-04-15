import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Cinemas from './pages/Cinemas'
import Movies from './pages/Movies'
import Layout from './pages/Layout'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' index element={<Index />} />
          <Route path='/cinemas' index element={<Cinemas />} />
          <Route path='/movies' index element={<Movies />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
