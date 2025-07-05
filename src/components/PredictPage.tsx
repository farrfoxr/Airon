import React, { useState } from 'react'
import '../styles/PredictPage.css'

function PredictPage() {
  const [formData, setFormData] = useState({
    pm25: '',
    no2: '',
    co: '',
    so2: '',
    o3: ''
  })
  const [prediction, setPrediction] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setPrediction(data.aqi)
    } catch (error) {
      alert('Error making prediction')
    }
  }

  return (
    <div className="predict-background">
      <div className="predict-card">
        <div className="predict-content">
          <h1 className="predict-title">Air Quality Index Prediction</h1>
          <form onSubmit={handleSubmit} className="predict-form">
            {['pm25', 'no2', 'co', 'so2', 'o3'].map((param) => (
              <div key={param} className="form-group">
                <label htmlFor={param}>{param.toUpperCase()}:</label>
                <input
                  type="number"
                  step="any"
                  id={param}
                  name={param}
                  value={formData[param as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="predict-input"
                />
              </div>
            ))}
            <button type="submit" className="predict-submit-button">
              Predict Air Quality
            </button>
          </form>

          {prediction !== null && (
            <div className="predict-result">
              <h2>Predicted AQI: {prediction.toFixed(2)}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PredictPage