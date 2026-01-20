import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Tag, Clock, ChefHat } from 'lucide-react'
import data from '../data/recipes.json'

function Home() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState("全部")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState({ title: '', category: '家常菜', difficulty: '简单', time: '', ingredients: '', steps: '' })

  useEffect(() => {
    const saved = localStorage.getItem('u-recipes-data')
    if (saved) {
      setItems(JSON.parse(saved))
    } else {
      setItems(data.initialRecipes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('u-recipes-data', JSON.stringify(items))
  }, [items])

  const filteredItems = filter === '全部' || filter === '' ? items : items.filter(item => item.category === filter)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case '简单': return 'bg-green-100 text-green-700'
      case '中等': return 'bg-yellow-100 text-yellow-700'
      case '困难': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleCreate = () => {
    setIsEditing(true)
    setEditingItem({ title: '', category: '家常菜', difficulty: '简单', time: '', ingredients: '', steps: '' })
  }

  const handleEdit = (item) => {
    setIsEditing(true)
    setEditingItem({ ...item })
  }

  const handleSave = () => {
    if (!editingItem.title.trim() || !editingItem.ingredients.trim()) {
      alert('请填写食谱名称和食材')
      return
    }

    const ingredients = editingItem.ingredients.split(/[,，]/).map(s => s.trim()).filter(s => s)

    if (editingItem.id) {
      setItems(items.map(item =>
        item.id === editingItem.id ? { ...editingItem, ingredients } : item
      ))
    } else {
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
      setItems([...items, {
        ...editingItem,
        id: newId,
        ingredients
      }])
    }
    setIsEditing(false)
    setEditingItem({ title: '', category: '家常菜', difficulty: '简单', time: '', ingredients: '', steps: '' })
  }

  const handleDelete = (id) => {
    if (confirm('确定要删除这个食谱吗？')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingItem.id ? '编辑食谱' : '添加食谱'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">食谱名称 *</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="输入食谱名称"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {data.categories.filter(cat => cat !== '全部').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">难度</label>
              <select
                value={editingItem.difficulty}
                onChange={(e) => setEditingItem({ ...editingItem, difficulty: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="简单">简单</option>
                <option value="中等">中等</option>
                <option value="困难">困难</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">烹饪时间</label>
              <input
                type="text"
                value={editingItem.time}
                onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="例如: 30分钟"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">食材 *</label>
              <textarea
                value={editingItem.ingredients}
                onChange={(e) => setEditingItem({ ...editingItem, ingredients: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                rows="3"
                placeholder="输入食材，用逗号分隔"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">烹饪步骤</label>
              <textarea
                value={editingItem.steps || ''}
                onChange={(e) => setEditingItem({ ...editingItem, steps: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                rows="4"
                placeholder="输入烹饪步骤"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition"
              >
                保存
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">食谱管理</h1>
          <p className="text-gray-600">管理您的美食食谱</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加食谱
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          <Tag className="w-5 h-5 text-gray-500" />
          {data.categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition ${filter === cat ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition relative">
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="w-5 h-5 text-rose-600" />
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
            </div>
            <div className="flex items-center gap-4 text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{item.time}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(item.difficulty)}`}>
                {item.difficulty}
              </span>
            </div>
            <p className="text-gray-600 mb-3">食材: {Array.isArray(item.ingredients) ? item.ingredients.slice(0, 3).join(', ') : item.ingredients.slice(0, 50)}...</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span className="text-xs px-2 py-1 rounded bg-rose-100 text-rose-700">
                {item.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-1"
              >
                <Edit className="w-4 h-4" />
                编辑
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ChefHat className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>暂无食谱</p>
        </div>
      )}
    </div>
  )
}

export default Home
