import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Tag, Music, Clock, Heart } from 'lucide-react'
import data from '../data/songs.json'

function Home() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState("全部")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState({ title: '', artist: '', album: '', duration: '', category: '流行' })

  useEffect(() => {
    const saved = localStorage.getItem('u-music-data')
    if (saved) {
      setItems(JSON.parse(saved))
    } else {
      setItems(data.initialSongs)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('u-music-data', JSON.stringify(items))
  }, [items])

  const filteredItems = filter === '全部' || filter === '' ? items : items.filter(item => item.category === filter)

  const toggleLike = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, liked: !item.liked } : item
    ))
  }

  const handleCreate = () => {
    setIsEditing(true)
    setEditingItem({ title: '', artist: '', album: '', duration: '', category: '流行' })
  }

  const handleEdit = (item) => {
    setIsEditing(true)
    setEditingItem({ ...item })
  }

  const handleSave = () => {
    if (!editingItem.title.trim() || !editingItem.artist.trim()) {
      alert('请填写歌曲名称和歌手')
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
        liked: false
      }])
    }
    setIsEditing(false)
    setEditingItem({ title: '', artist: '', album: '', duration: '', category: '流行' })
  }

  const handleDelete = (id) => {
    if (confirm('确定要删除这首歌曲吗？')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingItem.id ? '编辑歌曲' : '添加歌曲'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">歌曲名称 *</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="输入歌曲名称"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">歌手 *</label>
              <input
                type="text"
                value={editingItem.artist}
                onChange={(e) => setEditingItem({ ...editingItem, artist: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="输入歌手名称"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">专辑</label>
              <input
                type="text"
                value={editingItem.album}
                onChange={(e) => setEditingItem({ ...editingItem, album: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="输入专辑名称"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">时长</label>
              <input
                type="text"
                value={editingItem.duration}
                onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例如: 3:45"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {data.categories.filter(cat => cat !== '全部').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">音乐播放器</h1>
          <p className="text-gray-600">您的私人音乐库</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加歌曲
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          <Tag className="w-5 h-5 text-gray-500" />
          {data.categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition ${filter === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              </div>
              <button
                onClick={() => toggleLike(item.id)}
                className={`p-1 ${item.liked ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Heart className={`w-5 h-5 ${item.liked ? 'fill-current' : ''}`} />
              </button>
            </div>
            <p className="text-gray-600 mb-2">歌手: {item.artist}</p>
            <p className="text-gray-600 mb-3">专辑: {item.album}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{item.duration}</span>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700">
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
          <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>暂无歌曲</p>
        </div>
      )}
    </div>
  )
}

export default Home
