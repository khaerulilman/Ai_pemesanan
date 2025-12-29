import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import About from './page/about'
import Navbar from './layout/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 🔥 Route kategori */}
        <Route path="/category/:category" element={<Home />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
