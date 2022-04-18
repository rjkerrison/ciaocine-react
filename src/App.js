import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Cinemas from './pages/Cinemas'
import Movies from './pages/Movies'
import Layout from './pages/Layout'
import Login from './pages/auth/LoginPage'
import Signup from './pages/auth/Signup'
import Calendar from './pages/Calendar'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' index element={<Index />} />
          <Route path='/cinemas' index element={<Cinemas />} />
          <Route path='/calendar' index element={<Calendar />} />
          <Route path='/movies' index element={<Movies />} />
          <Route path='/auth'>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
