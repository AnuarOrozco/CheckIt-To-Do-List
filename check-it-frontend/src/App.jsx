import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Footer from '../components/Footer'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [currentDate, setCurrentDate] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [newTag, setNewTag] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(storedTodos)
    const today = new Date()
    setCurrentDate(today.toLocaleDateString('en-US', {
      month: '2-digit', day: '2-digit', year: '2-digit'
    }))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        tag: newTag.trim(),
        description: newDesc.trim(),
        completed: false
      }
      setTodos([...todos, todo])
      setNewTodo('')
      setNewTag('')
      setNewDesc('')
    }
  }

  const toggleTodo = id => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = activeTag
    ? todos.filter(todo => todo.tag === activeTag)
    : todos

  const openPopup = todo => {
    setSelectedTodo(todo)
    setShowPopup(true)
  }

  const startEditing = (id, text) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEditing = id => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editingText } : todo
    ))
    setEditingId(null)
  }

  const onDragEnd = result => {
    if (!result.destination) return
    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTodos(items)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 left-0 right-0 flex justify-center px-4 z-50">
        <motion.div className="bg-black rounded-full px-6 py-2 shadow-sm" whileHover={{ scale: 1.05 }}>
          <p className="text-white text-sm">Check It!</p>
        </motion.div>
      </div>

      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <section className="text-center mb-12">
          <motion.h1 className="text-5xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >Hola, Anuar</motion.h1>

          <motion.p className="text-lg text-gray-500 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >Today is {currentDate}</motion.p>
        </section>

        <section className="max-w-xl mx-auto">
          <div className="flex flex-col gap-2 mb-6">
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Task name" className="px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black" />
            <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)}
              placeholder="Tag" className="px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black" />
            <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description (optional)" className="px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black" />
            <button onClick={addTodo}
              className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">Add</button>
          </div>

          <div className="flex gap-2 mb-4 overflow-x-auto">
            {[...new Set(todos.map(todo => todo.tag))].map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm border ${tag === activeTag ? 'bg-black text-white' : 'text-black border-black'}`}>
                {tag}
              </button>
            ))}
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  <AnimatePresence>
                    {filteredTodos.map((todo, index) => (
                      <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                        {(provided) => (
                          <motion.li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-white shadow-sm"
                          >
                            <div className="flex items-center gap-3 w-full">
                              <span className="cursor-move text-gray-400 text-xl">☰</span>
                              <input type="checkbox" checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="h-5 w-5 text-black border-gray-300 rounded focus:ring-black" />
                              {editingId === todo.id ? (
                                <input value={editingText} onChange={(e) => setEditingText(e.target.value)}
                                  onBlur={() => saveEditing(todo.id)} autoFocus
                                  className="flex-1 ml-2 px-2 py-1 border-b border-black focus:outline-none" />
                              ) : (
                                <span onClick={() => openPopup(todo)}
                                  className={`flex-1 ml-2 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                  {todo.text}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2 items-center">
                              <button onClick={() => startEditing(todo.id, todo.text)} className="text-sm text-gray-400 hover:text-gray-600">✎</button>
                              <button onClick={() => deleteTodo(todo.id)} className="text-xl text-gray-400 hover:text-red-500">×</button>
                            </div>
                          </motion.li>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      </main>

      {showPopup && selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-2">{selectedTodo.text}</h2>
            <p className="text-sm text-gray-600 mb-1"><strong>Tag:</strong> {selectedTodo.tag}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Description:</strong> {selectedTodo.description || 'No description'}</p>
            <button onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition w-full">
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
