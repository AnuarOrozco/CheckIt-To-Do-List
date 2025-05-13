import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function DynamicIslandHeader() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const location = useLocation()

  // Actualizar la hora cada minuto
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    
    return () => clearInterval(interval)
  }, [])

  // Títulos para cada ruta
  const getTitle = () => {
    switch(location.pathname) {
      case '/about':
        return 'About'
      default:
        return 'Check It!'
    }
  }

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center px-4 z-50">
      <motion.div
        className={`bg-black rounded-full shadow-lg overflow-hidden ${isExpanded ? 'w-64' : 'w-32'}`}
        initial={{ width: 128 }}
        animate={{ width: isExpanded ? 256 : 128 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <div 
          className="flex items-center justify-between p-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Contenido minimalista cuando está contraído */}
          {!isExpanded && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-white text-sm font-medium">{currentTime}</span>
            </div>
          )}

          {/* Contenido expandido */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 flex items-center justify-between px-2"
              >
                <span className="text-white text-sm font-medium">{getTitle()}</span>
                <div className="flex space-x-3">
                  <Link to="/" className="text-white text-xs hover:text-gray-300 transition">Home</Link>
                  <Link to="/about" className="text-white text-xs hover:text-gray-300 transition">About</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicador de estado (siempre visible) */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}