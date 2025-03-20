import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-background">
      <div className="home-card">
        <div className="home-content">
          <h1 className="home-title">Air Quality Index Predictor</h1>
          <p className="home-description">
            Discover the power of predictive environmental analysis. Our advanced machine learning model 
            transforms complex pollutant data into meaningful insights, helping you understand and 
            anticipate air quality with unprecedented accuracy.
          </p>
          <button 
            className="home-cta-button"
            onClick={() => navigate('/predict')}
          >
            Predict Air Quality
          </button>
          <button 
            className="home-secondary-button"
            onClick={() => navigate('/city-pollution')}
          >
            Real-time City AQI
          </button>
        </div>
        <div className="home-links">
          <a 
            href="https://explore.openaq.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="home-external-link"
          >
            See Live Air Quality Sensors
          </a>
          <a 
            href="https://latlong.net" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="home-external-link"
          >
            latlong.net
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home