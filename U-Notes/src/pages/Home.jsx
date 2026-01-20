import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Calendar, Tag, FileText } from 'lucide-react'
import notesData from '../data/notes.json'

function Home() {
  const [notes, setNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('全部')
  const [isEditing, setIsEditing] = useState(false)
  const [editingNote, setEditingNote] = useState({ title: '', content: '', category: '技术', color: 'bg-purple-100' })

  useEffect(() => {
    const savedNotes = localStorage.getItem('u-notes-notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    } else {
      setNotes(notesData.initialNotes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('u-notes-notes', JSON.stringify(notes))
  }, [notes])

  const handleCreate = () => {
    setIsEditing(true)
    setEditingNote({ title: '', content: '', category: '技术', color: 'bg-purple-100' })
  }

  const handleEdit = (note) => {
    setIsEditing(true)
    setEditingNote(note)
  }

  const handleSave = () => {
    if (!editingNote.title.trim() || !editingNote.content.trim()) {
      alert('请填写标题和内容')
      return
    }

    if (editingNote.id) {
      setNotes(notes.map(note =>
        note.id === editingNote.id ? editingNote : note
      ))
    } else {
      const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1
      setNotes([...notes, {
        ...editingNote,
        id: newId,
        createdAt: new Date().toISOString().split('T')[0]
      }])
    }

    setIsEditing(false)
    setEditingNote({ title: '', content: '', category: '技术', color: 'bg-purple-100' })
  }

  const handleDelete = (id) => {
    if (confirm('确定要删除这条笔记吗？')) {
      setNotes(notes.filter(note => note.id !== id))
    }
  }

  const filteredNotes = notes
    .filter(note => filter === '全部' || note.category === filter)
    .filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">笔记管理</h1>
        <p className="text-gray-600">记录您的每一个灵感</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索笔记..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleCreate}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            新建笔记
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Tag className="w-5 h-5 text-gray-500" />
          {notesData.categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isEditing && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {editingNote.id ? '编辑笔记' : '新建笔记'}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={editingNote.title}
              onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
              placeholder="标题"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              value={editingNote.content}
              onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
              placeholder="内容"
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-4">
              <select
                value={editingNote.category}
                onChange={(e) => setEditingNote({ ...editingNote, category: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {notesData.categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={editingNote.color}
                onChange={(e) => setEditingNote({ ...editingNote, color: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {notesData.colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                保存
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <div key={note.id} className={`${note.color} rounded-xl shadow-md p-6 hover:shadow-lg transition`}>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3 whitespace-pre-line">{note.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {note.createdAt}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-purple-600 hover:text-purple-800 transition p-1"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-500 hover:text-red-700 transition p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs px-2 py-1 rounded bg-white bg-opacity-50 text-gray-700">
                {note.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>暂无笔记</p>
        </div>
      )}
    </div>
  )
}

export default Home
