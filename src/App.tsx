// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import PredictPage from './components/PredictPage'
import CityPollutionPage from './components/CityPollutionPage'
import './App.css'

function App() {
  return (
    <Router basename="/Airon">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/city-pollution" element={<CityPollutionPage />} />
      </Routes>
    </Router>
  )
}

export default App