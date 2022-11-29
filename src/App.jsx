import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Navbarr from './componentes/Navbar'
import Loading from './componentes/Loading'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import "./styles/App.css"

function App() {
 
const isLoadingg=useSelector(state=>state.loading)

  return (
  <HashRouter>
    <div className="App">
      
    {isLoadingg&&<Loading/>}

    <Navbarr/>
        <Container className='my-5'>

     <Routes>

      <Route  path='/' element={<Home/>}/>
      <Route  path='/product/:id' element={<ProductDetails/>}/>
      <Route  path='/login' element={<Login/>}/>
      <Route  path='/purchases' element={<Favorites/>}/>

     </Routes> </Container>
    </div>
    </HashRouter>
   
  )
}

export default App
