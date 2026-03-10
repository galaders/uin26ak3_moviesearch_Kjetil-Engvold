import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Movie from './Pages/Movie'

function App() {
//const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":movie" element={<Movie />} /> 
    </Routes>

  )
}

export default App