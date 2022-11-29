import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filtersearch, filterSeccionThunk, getProducstThunk } from '../store/slices/products.slice';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigatee=useNavigate()
    const dispatchh=useDispatch()
    const products=useSelector(state=>state.products)
    const[categories,setcategories]=useState([])
    const [inputsearch,setSearch]=useState("")

    useEffect(()=>{
        dispatchh(getProducstThunk())
        axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
        .then(res=>setcategories(res.data.data.categories))//es necesario acceder adata 2 veces
    },[])

   

    return (
        <div className='Home-app'>
            <section className='home-interfaz'>

           

            <InputGroup className="mb-3">
        <Form.Control
          placeholder="search"
          aria-label="search"
          aria-describedby="basic-addon2"
          onChange={(e)=>setSearch(e.target.value)}
          value={inputsearch}
        />
        <Button onClick={()=>dispatchh(filtersearch(inputsearch))} variant="outline-secondary" id="button-addon2">
        <i className='bx bx-search-alt'></i>
        </Button>
      </InputGroup>
    </section>
   <div className='categories-home-container'>
    <div className="category-option-box">          
     <p >Category</p>

           <select  className='select-option'> 
            <option onClick={()=>dispatchh(getProducstThunk())} >All</option>
            {categories?.map(cate=><option onClick={()=>{
              dispatchh(filterSeccionThunk(cate))
              }} key={cate.name}>{cate.name}</option>)}
            </select>
            </div>
            </div>
  <section className='product-items'>
            {products.map(prod=>{  
    return(
      <ul key={prod.id} className='item'>        
      <img src={prod.productImgs[0]}alt=""/>      
      <li className='cat'> {prod.category.name}</li>
      <li>{prod.title}</li>
      <li className='price'>{prod.price}$</li>
      <button className='buy-details'>Buy <i className='bx bxs-shopping-bags'></i></button>
        <Button onClick={()=>navigatee(`/product/${prod.id}`)} variant="primary"><i className='bx bx-shopping-bag'></i> More info</Button>
        </ul>
        )
    })}
 </section>


    </div>  
 );

};


export default Home;