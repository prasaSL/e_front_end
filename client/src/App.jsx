
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import ProductAddNew from './pages/ProductAddNew'
import Login from './pages/Login'
import SearchResultPage from './pages/SearchResultPage'
import ProductUpdate from './pages/ProductUpdate'
import ProductView from './pages/ProductView'
import PrivetRoute from './components/PrivetRoute'

function App() {
 

  return (
    <BrowserRouter>
   
      <Routes>
      <Route element={<PrivetRoute/>}>
      <Route element={<Header/>} />

      <Route path="/" element={<Home/>} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/product/add-new" element={<ProductAddNew/>} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route path='/product/update/:id' element={<ProductUpdate />} />
      <Route path='/product/view/:id' element={<ProductView />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
      <Route path="/login" element={<Login/>} />
    
      </Routes>
    </BrowserRouter>
  )
}

export default App
