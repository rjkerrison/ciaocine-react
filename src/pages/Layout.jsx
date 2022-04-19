import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Popup from '../components/Popup'
import Toast from '../components/Toast'

const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>

    <footer>
      This website is not commercial in any way. For full licence information,
      find&nbsp;
      <a href='https://gtihub.com/rjkerrison/ciaocine'>the project on Github</a>
      . &copy; Robin James Kerrison 2022
    </footer>

    <Toast />
    <Popup />
  </>
)

export default Layout
