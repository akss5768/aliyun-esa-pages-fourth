import { useState, useEffect } from 'react'
import { CloudSun, Thermometer, Droplets, Wind, Calendar } from 'lucide-react'
import data from '../data/weather.json'

function Home() {
  const [selectedCity, setSelectedCity] = useState(data.cities[0])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">天气预报</h1>
        <p className="text-gray-600">实时天气信息</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <CloudSun className="w-5 h-5 text-gray-500" />
          {data.cities.map(city => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-lg transition ${selectedCity.name === city.name ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {city.name}
            </button>
          ))}
        </div>

        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedCity.name}</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Thermometer className="w-12 h-12 text-sky-600" />
            <p className="text-6xl font-bold text-gray-800">{selectedCity.temperature}°C</p>
          </div>
          <p className="text-xl text-gray-600 mb-6">{selectedCity.condition}</p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600">湿度</p>
              <p className="text-xl font-bold">{selectedCity.humidity}%</p>
            </div>
            <div className="text-center">
              <Wind className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-600">风速</p>
              <p className="text-xl font-bold">{selectedCity.wind}</p>
            </div>
            <div className="text-center">
              <CloudSun className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <p className="text-gray-600">天气</p>
              <p className="text-xl font-bold">{selectedCity.condition}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">未来5天预报</h3>
        <div className="grid grid-cols-5 gap-4">
          {data.forecast.map((day, index) => (
            <div key={index} className="text-center p-4 bg-sky-50 rounded-lg">
              <p className="text-gray-600 mb-2">{day.day}</p>
              <CloudSun className="w-8 h-8 text-sky-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{day.high}°</p>
              <p className="text-gray-600">{day.low}°</p>
              <p className="text-sm text-gray-600 mt-2">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
