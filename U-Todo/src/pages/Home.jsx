import { useState, useEffect } from 'react'
import { Plus, Trash2, Filter, Calendar } from 'lucide-react'
import todosData from '../data/todos.json'

function Home() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('全部')
  const [priority, setPriority] = useState('中')

  useEffect(() => {
    const savedTodos = localStorage.getItem('u-todo-todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    } else {
      setTodos(todosData.initialTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('u-todo-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1
      setTodos([...todos, {
        id: newId,
        text: newTodo,
        completed: false,
        priority: priority,
        category: filter !== '全部' ? filter : '工作'
      }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = filter === '全部'
    ? todos
    : todos.filter(todo => todo.category === filter)

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case '高': return 'bg-red-100 text-red-700'
      case '中': return 'bg-yellow-100 text-yellow-700'
      case '低': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">待办事项</h1>
        <p className="text-gray-600">高效管理您的日常任务</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-gray-500 text-sm">全部任务</p>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-gray-500 text-sm">已完成</p>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-gray-500 text-sm">进行中</p>
          <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="添加新的待办事项..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {todosData.priorities.map(p => (
              <option key={p} value={p}>{p}优先级</option>
            ))}
          </select>
          <button
            onClick={addTodo}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            添加
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          {todosData.categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`bg-white rounded-lg shadow p-4 flex items-center justify-between transition ${
              todo.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 text-green-600 rounded"
              />
              <div className="flex-1">
                <p className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {todo.text}
                </p>
                <div className="flex gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}优先级
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                    {todo.category}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>暂无待办事项</p>
        </div>
      )}
    </div>
  )
}

export default Home
