import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Tag, Video, Play, Clock, Eye, Heart } from 'lucide-react'
import data from '../data/videos.json'

function Home() {
  const [videos, setVideos] = useState([])
  const [filter, setFilter] = useState("全部")
  const [searchTerm, setSearchTerm] = useState("")
  const [likedVideos, setLikedVideos] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem('u-videos-data')
    if (saved) {
      setVideos(JSON.parse(saved))
    } else {
      setVideos(data.initialVideos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('u-videos-data', JSON.stringify(videos))
  }, [videos])

  const toggleLike = (id) => {
    setLikedVideos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const getCategoryColor = (category) => {
    const colors = {
      '教程': 'bg-blue-100 text-blue-700',
      '娱乐': 'bg-pink-100 text-pink-700',
      '纪录片': 'bg-green-100 text-green-700',
      '其他': 'bg-gray-100 text-gray-700'
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  const filteredVideos = videos
    .filter(video => filter === '全部' || video.category === filter)
    .filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleCreate = () => {
    const title = prompt('请输入视频标题:')
    if (title && title.trim()) {
      const newId = videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1
      setVideos([...videos, {
        id: newId,
        title: title.trim(),
        duration: '0:00',
        category: '其他',
        views: 0,
        thumbnail: ''
      }])
    }
  }

  const handleEdit = (video) => {
    const newTitle = prompt('请输入新的视频标题:', video.title)
    if (newTitle && newTitle.trim()) {
      setVideos(videos.map(v =>
        v.id === video.id ? { ...v, title: newTitle.trim() } : v
      ))
    }
  }

  const handleDelete = (id) => {
    if (confirm('确定要删除这个视频吗？')) {
      setVideos(videos.filter(video => video.id !== id))
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">视频管理</h1>
          <p className="text-gray-600">管理您的视频资源</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加视频
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索视频..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Tag className="w-5 h-5 text-gray-500" />
          {data.categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition ${filter === cat ? 'bg-slate-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group relative">
            <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <Video className="w-16 h-16 text-slate-300" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition transform scale-90 group-hover:scale-100">
                  <Play className="w-8 h-8 text-slate-600 ml-1" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              <button
                onClick={() => toggleLike(video.id)}
                className={`absolute top-2 right-2 p-2 rounded-full ${likedVideos[video.id] ? 'bg-red-500 text-white' : 'bg-white text-gray-500'} shadow-md`}
              >
                <Heart className={`w-5 h-5 ${likedVideos[video.id] ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{video.title}</h3>
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views} 次观看</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>
              </div>
              <div>
                <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(video.category)}`}>
                  {video.category}
                </span>
              </div>
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() => handleEdit(video)}
                className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-1"
              >
                <Edit className="w-4 h-4" />
                编辑
              </button>
              <button
                onClick={() => handleDelete(video.id)}
                className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>暂无视频</p>
        </div>
      )}
    </div>
  )
}

export default Home
