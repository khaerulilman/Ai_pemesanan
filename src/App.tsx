import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import About from './page/about'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/category/:category" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
