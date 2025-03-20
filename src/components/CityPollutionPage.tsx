import React, { useState } from 'react'
import '../styles/CityPollutionPage.css'

function CityPollutionPage() {
  const [cityName, setCityName] = useState('')
  const [displayedCity, setDisplayedCity] = useState('')
  const [pollutantData, setPollutantData] = useState<{
    pollutants: {
      pm10: number
      pm25: number
      no2: number
      co: number
      so2: number
      o3: number
    } | null
    aqi_prediction: number | null
  }>({
    pollutants: null,
    aqi_prediction: null
  })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('https://0959-182-3-36-241.ngrok-free.app/city-pollution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: cityName }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setPollutantData({ pollutants: null, aqi_prediction: null })
      } else {
        setPollutantData(data)
        setDisplayedCity(cityName)
        setError(null)
      }
    } catch (error) {
      setError('Error fetching pollution data')
      setPollutantData({ pollutants: null, aqi_prediction: null })
    }
  }

  return (
    <div className="city-pollution-background">
      <div className="city-pollution-card">
        <div className="city-pollution-content">
          <h1 className="city-pollution-title">City Air Quality Prediction</h1>
          
          <form onSubmit={handleSubmit} className="city-pollution-form">
            <div className="form-group">
              <label htmlFor="cityName">Enter Desired City Name:</label>
              <input
                type="text"
                id="cityName"
                name="cityName"
                value={cityName}
                onChange={handleChange}
                required
                className="city-pollution-input"
                placeholder="e.g., Seoul, Manila"
              />
            </div>
            <button type="submit" className="city-pollution-submit-button">
              Get Air Quality
            </button>
          </form>

          {error && (
            <div className="city-pollution-error">
              <p>{error}</p>
            </div>
          )}

          {pollutantData.pollutants && (
            <div className="city-pollution-results">
              <h2>Pollutant Data for {displayedCity}</h2>
              <div className="pollutant-details">
                <p>PM10: {pollutantData.pollutants.pm10.toFixed(2)} µg/m³</p>
                <p>PM2.5: {pollutantData.pollutants.pm25.toFixed(2)} µg/m³</p>
                <p>NO2: {pollutantData.pollutants.no2.toFixed(2)} µg/m³</p>
                <p>CO: {pollutantData.pollutants.co.toFixed(2)} µg/m³</p>
                <p>SO2: {pollutantData.pollutants.so2.toFixed(2)} µg/m³</p>
                <p>O3: {pollutantData.pollutants.o3.toFixed(2)} µg/m³</p>
              </div>
              {pollutantData.aqi_prediction !== null && (
                <div className="aqi-prediction">
                  <h3>Predicted Air Quality Index (AQI): {pollutantData.aqi_prediction.toFixed(2)}</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CityPollutionPage