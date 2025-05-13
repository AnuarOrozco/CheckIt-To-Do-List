import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [currentDate, setCurrentDate] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [newTag, setNewTag] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [editingTodo, setEditingTodo] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [draggedItemIndex, setDraggedItemIndex] = useState(null)

  // Load from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    })
    setCurrentDate(formattedDate)
  }, [])

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTodo,
        tag: newTag,
        desc: newDesc,
        completed: false
      }
      setTodos([...todos, newTask])
      setNewTodo('')
      setNewTag('')
      setNewDesc('')
    }
  }

  const updateTodo = (id, updatedFields) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedFields } : todo))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleDragStart = (index) => {
    setDraggedItemIndex(index)
  }

  const handleDrop = (index) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return
    const updatedTodos = [...todos]
    const [removed] = updatedTodos.splice(draggedItemIndex, 1)
    updatedTodos.splice(index, 0, removed)
    setTodos(updatedTodos)
    setDraggedItemIndex(null)
  }

  const tags = [...new Set(todos.map(todo => todo.tag).filter(Boolean))]

  const filteredTodos = selectedTag
    ? todos.filter(todo => todo.tag === selectedTag)
    : todos

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

      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <section className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hello, Anuar
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

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center mb-6 gap-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm border ${
                tag === selectedTag
                  ? 'bg-black text-white'
                  : 'text-gray-600 border-gray-300 hover:border-black'
              } transition`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Task Input */}
        <section className="max-w-md mx-auto mb-8 space-y-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Task name..."
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
          />
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Tag..."
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description..."
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black resize-none"
          />
          <button
            onClick={addTodo}
            className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Add Task
          </button>
        </section>

        {/* Task List */}
        <ul className="space-y-2 max-w-md mx-auto">
          <AnimatePresence>
            {filteredTodos.map((todo, index) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between p-3 border rounded hover:shadow-md bg-white"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
              >
                <div
                  className="flex items-center gap-2 flex-1 cursor-pointer"
                  onClick={() => {
                    setEditingTodo(todo)
                    setShowPopup(true)
                  }}
                >
                  <span className="cursor-grab text-gray-400">☰</span>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-5 w-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <div className="ml-2">
                    <span
                      className={`block font-medium ${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                      }`}
                    >
                      {todo.text}
                    </span>
                    {todo.tag && (
                      <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2">
                        {todo.tag}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingTodo(todo)
                      setShowPopup(true)
                    }}
                    className="text-gray-400 hover:text-black"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </main>

      {showPopup && editingTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Edit Task</h2>
            <input
              type="text"
              value={editingTodo.text}
              onChange={(e) => setEditingTodo({ ...editingTodo, text: e.target.value })}
              className="w-full border-b py-2"
            />
            <input
              type="text"
              value={editingTodo.tag}
              onChange={(e) => setEditingTodo({ ...editingTodo, tag: e.target.value })}
              className="w-full border-b py-2"
            />
            <textarea
              value={editingTodo.desc}
              onChange={(e) => setEditingTodo({ ...editingTodo, desc: e.target.value })}
              className="w-full border-b py-2 resize-none"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowPopup(false)} className="text-gray-500 hover:underline">
                Cancel
              </button>
              <button
                onClick={() => {
                  updateTodo(editingTodo.id, editingTodo)
                  setShowPopup(false)
                }}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
