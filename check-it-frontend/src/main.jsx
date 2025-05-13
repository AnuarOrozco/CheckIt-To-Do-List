import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

// Configuración inicial del service worker (para PWA)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err)
      })
  })
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)