import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'  // Cambiado de MinimalFooter a Footer

export default function Home() {
  const [todos, setTodos] = useState([])
  const [currentDate, setCurrentDate] = useState('')
  const [newTodo, setNewTodo] = useState('')

  // Obtener y formatear fecha actual
  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    })
    setCurrentDate(formattedDate)
  }, [])

  // Añadir nueva tarea
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }])
      setNewTodo('')
    }
  }

  // Alternar estado de tarea
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Eliminar tarea
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Island Header */}
      <div className="fixed top-4 left-0 right-0 flex justify-center px-4 z-50">
        <motion.div 
          className="bg-black rounded-full px-6 py-2 shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-white text-sm">Check It!</p>
        </motion.div>
      </div>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <motion.h1 
            className="text-5xl md:text-6xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hola, Anuar
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-500 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Today is {currentDate}
          </motion.p>
        </section>

        {/* Todo List Section */}
        <section className="max-w-md mx-auto">
          {/* Input para nueva tarea */}
          <div className="flex mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
            />
            <button
              onClick={addTodo}
              className="ml-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Add
            </button>
          </div>

          {/* Lista de tareas */}
          <ul className="space-y-2">
            {todos.map((todo) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 border-b border-gray-100"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-5 w-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className={`ml-3 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </motion.li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer - nombre cambiado de MinimalFooter a Footer */}
      <Footer />
    </div>
  )
}