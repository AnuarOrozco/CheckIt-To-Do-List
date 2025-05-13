import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation()
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Barra de navegación */}
        <Navbar />
        
        {/* Contenido principal */}
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
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
    </Router>
  )
}

export default App