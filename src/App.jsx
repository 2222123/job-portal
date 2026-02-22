import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import other pages here as you create them

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Add more <Route /> tags here for other pages */}
      </Routes>
    </div>
  )
}

export default App