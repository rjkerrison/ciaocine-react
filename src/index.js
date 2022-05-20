import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthProviderWrapper } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContextProvider } from './context/ToastContext'
import { CalendarContextProvider } from './context/CalendarContext'
import { LikesContextProvider } from './context/LikesContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ToastContextProvider>
          <CalendarContextProvider>
            <LikesContextProvider>
              <App />
            </LikesContextProvider>
          </CalendarContextProvider>
        </ToastContextProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
