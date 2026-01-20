import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Tag, Activity, Timer, Calendar } from 'lucide-react'
import data from '../data/workouts.json'

function Home() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState("全部")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState({ name: '', category: '有氧', duration: '', calories: '', date: '' })

  useEffect(() => {
    const saved = localStorage.getItem('u-workout-data')
    if (saved) {
      setItems(JSON.parse(saved))
    } else {
      setItems(data.initialWorkouts)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('u-workout-data', JSON.stringify(items))
  }, [items])

  const filteredItems = filter === '全部' || filter === '' ? items : items.filter(item => item.category === filter)

  const getCategoryColor = (category) => {
    switch (category) {
      case '有氧': return 'bg-blue-100 text-blue-700'
      case '力量': return 'bg-red-100 text-red-700'
      case '柔韧': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleCreate = () => {
    const today = new Date().toISOString().split('T')[0]
    setIsEditing(true)
    setEditingItem({ name: '', category: '有氧', duration: '', calories: '', date: today })
  }

  const handleEdit = (item) => {
    setIsEditing(true)
    setEditingItem({ ...item })
  }

  const handleSave = () => {
    if (!editingItem.name.trim() || !editingItem.duration) {
      alert('请填写运动名称和时长')
      return
    }

    if (editingItem.id) {
      setItems(items.map(item =>
        item.id === editingItem.id ? editingItem : item
      ))
    } else {
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
      setItems([...items, {
        ...editingItem,
        id: newId,
        duration: editingItem.duration + ' 分钟',
        calories: editingItem.calories ? editingItem.calories + ' 卡路里' : ''
      }])
    }
    setIsEditing(false)
    setEditingItem({ name: '', category: '有氧', duration: '', calories: '', date: '' })
  }

  const handleDelete = (id) => {
    if (confirm('确定要删除这条记录吗？')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingItem.id ? '编辑记录' : '添加记录'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">运动名称 *</label>
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="输入运动名称"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {data.categories.filter(cat => cat !== '全部').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">时长（分钟）*</label>
              <input
                type="number"
                min="1"
                value={editingItem.duration.replace(' 分钟', '')}
                onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="输入运动时长"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">消耗卡路里</label>
              <input
                type="number"
                min="0"
                value={editingItem.calories?.replace(' 卡路里', '') || ''}
                onChange={(e) => setEditingItem({ ...editingItem, calories: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="输入消耗卡路里"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">日期</label>
              <input
                type="date"
                value={editingItem.date}
                onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition"
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">健身记录</h1>
          <p className="text-gray-600">记录您的健身计划</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加记录
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          <Tag className="w-5 h-5 text-gray-500" />
          {data.categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition ${filter === cat ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
              <Activity className="w-5 h-5 text-violet-600" />
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
            </div>
            <div className="flex items-center gap-4 text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                <span>{item.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-4 h-4" />
                <span>{item.calories}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {item.date}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(item.category)}`}>
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
          <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>暂无记录</p>
        </div>
      )}
    </div>
  )
}

export default Home
