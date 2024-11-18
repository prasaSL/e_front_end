
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import ProductAddNew from './pages/ProductAddNew'
import Login from './pages/Login'

function App() {
 

  return (
    <BrowserRouter>
    <Header />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/product/add-new" element={<ProductAddNew/>} />
      <Route path="/login" element={<Login/>} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
