import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Tag, Lock, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react'
import data from '../data/passwords.json'

function Home() {
  const [passwords, setPasswords] = useState([])
  const [filter, setFilter] = useState("全部")
  const [searchTerm, setSearchTerm] = useState("")
  const [showPasswords, setShowPasswords] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editingPassword, setEditingPassword] = useState({ name: '', username: '', password: '', category: '社交' })

  useEffect(() => {
    const saved = localStorage.getItem('u-passwords-data')
    if (saved) {
      setPasswords(JSON.parse(saved))
    } else {
      setPasswords(data.initialPasswords)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('u-passwords-data', JSON.stringify(passwords))
  }, [passwords])

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  }

  const generatePassword = (length = 12) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const filteredPasswords = passwords
    .filter(pwd => filter === '全部' || pwd.category === filter)
    .filter(pwd =>
      pwd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pwd.username.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleCreate = () => {
    setIsEditing(true)
    setEditingPassword({ name: '', username: '', password: '', category: '社交' })
  }

  const handleEdit = (pwd) => {
    setIsEditing(true)
    setEditingPassword({ ...pwd })
  }

  const handleSave = () => {
    if (!editingPassword.name.trim() || !editingPassword.password.trim()) {
      alert('请填写名称和密码')
      return
    }

    if (editingPassword.id) {
      setPasswords(passwords.map(pwd =>
        pwd.id === editingPassword.id ? { ...editingPassword, updated: new Date().toISOString().split('T')[0] } : pwd
      ))
    } else {
      const newId = passwords.length > 0 ? Math.max(...passwords.map(p => p.id)) + 1 : 1
      setPasswords([...passwords, {
        ...editingPassword,
        id: newId,
        updated: new Date().toISOString().split('T')[0]
      }])
    }
    setIsEditing(false)
    setEditingPassword({ name: '', username: '', password: '', category: '社交' })
  }

  const handleDelete = (id) => {
    if (confirm('确定要删除这个密码吗？')) {
      setPasswords(passwords.filter(pwd => pwd.id !== id))
    }
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingPassword.id ? '编辑密码' : '添加密码'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">名称 *</label>
              <input
                type="text"
                value={editingPassword.name}
                onChange={(e) => setEditingPassword({ ...editingPassword, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="例如: 微信"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
              <input
                type="text"
                value={editingPassword.username}
                onChange={(e) => setEditingPassword({ ...editingPassword, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="输入用户名"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码 *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingPassword.password}
                  onChange={(e) => setEditingPassword({ ...editingPassword, password: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="输入密码"
                />
                <button
                  onClick={() => setEditingPassword({ ...editingPassword, password: generatePassword() })}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  title="生成随机密码"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <select
                value={editingPassword.category}
                onChange={(e) => setEditingPassword({ ...editingPassword, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {data.categories.filter(cat => cat !== '全部').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">密码管理</h1>
          <p className="text-gray-600">安全管理您的密码</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加密码
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索密码..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Tag className="w-5 h-5 text-gray-500" />
          {data.categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition ${filter === cat ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPasswords.map((pwd) => (
          <div key={pwd.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{pwd.name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">
                    {pwd.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">用户名</p>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-gray-700">{pwd.username}</span>
                  <button
                    onClick={() => copyToClipboard(pwd.username)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">密码</p>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-gray-700">
                    {showPasswords[pwd.id] ? pwd.password : '********'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePasswordVisibility(pwd.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords[pwd.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(pwd.password)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">更新于: {pwd.updated}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(pwd)}
                className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-1"
              >
                <Edit className="w-4 h-4" />
                编辑
              </button>
              <button
                onClick={() => handleDelete(pwd.id)}
                className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPasswords.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Lock className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>暂无密码记录</p>
        </div>
      )}
    </div>
  )
}

export default Home
