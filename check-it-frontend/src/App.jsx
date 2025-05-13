import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            {/* Puedes agregar más rutas aquí si lo necesitas */}
          </Routes>
        </AnimatePresence>
      </main>

      {/* Notificaciones toast */}
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'font-sans',
          style: {
            background: '#ffffff',
            color: '#1f2937',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            borderRadius: '0.5rem',
            padding: '1rem',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  )
}

export default App
