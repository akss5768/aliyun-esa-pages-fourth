import { useState, useEffect } from 'react'
import { Settings, Bell, Palette, Globe, Database, Shield, Sun } from 'lucide-react'
import data from '../data/settings.json'

function Home() {
  const [settings, setSettings] = useState(data)

  useEffect(() => {
    localStorage.setItem('u-settings-data', JSON.stringify(settings))
  }, [settings])

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">系统设置</h1>
        <p className="text-gray-600">管理系统配置选项</p>
      </div>

      <div className="space-y-6">
        {/* 主题设置 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-zinc-600" />
            <h2 className="text-xl font-bold text-gray-800">主题设置</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 mb-1">浅色模式</p>
              <p className="text-sm text-gray-500">选择界面主题颜色</p>
            </div>
            <button
              onClick={() => toggleSetting('theme')}
              className={`p-2 rounded-full transition ${settings.theme === 'light' ? 'bg-zinc-200' : ''}`}
            >
              <Sun className="w-6 h-6 text-zinc-600" />
            </button>
          </div>
        </div>

        {/* 语言设置 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-zinc-600" />
            <h2 className="text-xl font-bold text-gray-800">语言设置</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 mb-1">界面语言</p>
              <p className="text-sm text-gray-500">选择界面显示语言</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              <option value="zh-CN">简体中文</option>
              <option value="en-US">English</option>
            </select>
          </div>
        </div>

        {/* 通知设置 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-zinc-600" />
            <h2 className="text-xl font-bold text-gray-800">通知设置</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 mb-1">启用通知</p>
              <p className="text-sm text-gray-500">接收应用通知提醒</p>
            </div>
            <button
              onClick={() => toggleSetting('notifications')}
              className={`w-14 h-8 rounded-full transition relative ${settings.notifications ? 'bg-zinc-600' : 'bg-gray-300'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition ${settings.notifications ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* 备份设置 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-zinc-600" />
            <h2 className="text-xl font-bold text-gray-800">备份设置</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 mb-1">自动备份</p>
              <p className="text-sm text-gray-500">定期备份应用数据</p>
            </div>
            <button
              onClick={() => toggleSetting('autoBackup')}
              className={`w-14 h-8 rounded-full transition relative ${settings.autoBackup ? 'bg-zinc-600' : 'bg-gray-300'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition ${settings.autoBackup ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* 安全设置 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-zinc-600" />
            <h2 className="text-xl font-bold text-gray-800">安全设置</h2>
          </div>
          <div className="text-center py-4 text-gray-500">
            <Settings className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>更多安全设置开发中...</p>
          </div>
        </div>

        {/* 设置列表 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-zinc-600" />
            <h2 className="text-xl font-bold text-gray-800">所有设置</h2>
          </div>
          <div className="space-y-3">
            {data.settings.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition">
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <span className="text-zinc-700 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
