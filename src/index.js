import React from 'react'
import ReactDOM from 'react-dom/client'

import './style/index.css'
import './style/main.scss'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthProviderWrapper } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContextProvider } from './context/ToastContext'
import { CalendarContextProvider } from './context/CalendarContext'
import { LikedContextProvider } from './context/LikedContext'
import { MetadataContextProvider } from './context/MetadataContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <AuthProviderWrapper>
      <ToastContextProvider>
        <LikedContextProvider>
          <MetadataContextProvider>
            <CalendarContextProvider>
              <App />
            </CalendarContextProvider>
          </MetadataContextProvider>
        </LikedContextProvider>
      </ToastContextProvider>
    </AuthProviderWrapper>
  </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
