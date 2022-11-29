import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Navbarr from './componentes/Navbar'
import Loading from './componentes/Loading'
import { useSelector } from 'react-redux'
import "./styles/App.css"

function App() {
 
const isLoadingg=useSelector(state=>state.loading)

  return (
  <HashRouter>
    <div className="App">
      
    {isLoadingg&&<Loading/>}

    <Navbarr/>
    
     <Routes>

      <Route  path='/' element={<Home/>}/>
      <Route  path='/product/:id' element={<ProductDetails/>}/>
      <Route  path='/login' element={<Login/>}/>
      <Route  path='/purchases' element={<Favorites/>}/>

     </Routes>
    </div>
    </HashRouter>
  )
}

export default App
