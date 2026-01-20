import { CloudSun } from 'lucide-react'

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <CloudSun className="w-8 h-8 text-sky-600" />
            <span className="text-xl font-bold text-gray-800">U-Weather</span>
          </div>
          <div className="text-gray-600">
            实时天气信息
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar