import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Tag, FolderKanban, Users, Clock, TrendingUp } from 'lucide-react'
import data from '../data/projects.json'

function Home() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState("全部")
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState({ name: '', category: '进行中', progress: 0, members: 1, deadline: '' })

  useEffect(() => {
    const saved = localStorage.getItem('u-projects-data')
    if (saved) {
      setProjects(JSON.parse(saved))
    } else {
      setProjects(data.initialProjects)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('u-projects-data', JSON.stringify(projects))
  }, [projects])

  const getCategoryColor = (category) => {
    const colors = {
      '进行中': 'bg-blue-100 text-blue-700',
      '已完成': 'bg-green-100 text-green-700',
      '暂停': 'bg-yellow-100 text-yellow-700',
      '计划中': 'bg-gray-100 text-gray-700'
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500'
    if (progress >= 70) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  const filteredProjects = filter === '全部' ? projects : projects.filter(p => p.category === filter)

  const handleCreate = () => {
    setIsEditing(true)
    setEditingProject({ name: '', category: '进行中', progress: 0, members: 1, deadline: '' })
  }

  const handleEdit = (project) => {
    setIsEditing(true)
    setEditingProject({ ...project })
  }

  const handleSave = () => {
    if (!editingProject.name.trim()) {
      alert('请填写项目名称')
      return
    }

    if (editingProject.id) {
      setProjects(projects.map(project =>
        project.id === editingProject.id ? editingProject : project
      ))
    } else {
      const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1
      setProjects([...projects, {
        ...editingProject,
        id: newId
      }])
    }
    setIsEditing(false)
    setEditingProject({ name: '', category: '进行中', progress: 0, members: 1, deadline: '' })
  }

  const handleDelete = (id) => {
    if (confirm('确定要删除这个项目吗？')) {
      setProjects(projects.filter(project => project.id !== id))
    }
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingProject.id ? '编辑项目' : '添加项目'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">项目名称 *</label>
              <input
                type="text"
                value={editingProject.name}
                onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="输入项目名称"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <select
                value={editingProject.category}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {data.categories.filter(cat => cat !== '全部').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">进度: {editingProject.progress}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={editingProject.progress}
                onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">团队成员</label>
              <input
                type="number"
                min="1"
                value={editingProject.members}
                onChange={(e) => setEditingProject({ ...editingProject, members: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">截止日期</label>
              <input
                type="date"
                value={editingProject.deadline}
                onChange={(e) => setEditingProject({ ...editingProject, deadline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">项目管理</h1>
          <p className="text-gray-600">管理您的项目进度</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加项目
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          <Tag className="w-5 h-5 text-gray-500" />
          {data.categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition ${filter === cat ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">进度</span>
                <span className="font-bold text-gray-800">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{project.members} 成员</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{project.deadline}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-gray-600">项目正在稳步推进</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-1"
              >
                <Edit className="w-4 h-4" />
                编辑
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FolderKanban className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>暂无项目</p>
        </div>
      )}
    </div>
  )
}

export default Home
