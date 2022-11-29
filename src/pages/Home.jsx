import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filtersearch, filterSectionThunk, getProductsThunk } from '../store/slices/products.slice';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';


const Home = () => {
  const navig = useNavigate()
  const dispa = useDispatch()
  const products = useSelector(state => state.products)
  const [categories, setcategories] = useState([])
  const [inputsearch, setSearch] = useState("")

  useEffect(() => {
    dispa(getProductsThunk())
    axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then(res => setcategories(res.data.data.categories))//es necesario acceder adata 2 veces
  }, [])



  return (
    <>
      <Row>
        <Col lg={3}><div className='categories-home-container'>
          <div className="category-option-box">
            <p >Category</p>

            <select className='select-option'>
              <option onClick={() => dispa(getProductsThunk())} >All</option>
              {categories?.map(cate => <option onClick={() => {
                dispa(filterSectionThunk(cate))
              }} key={cate.name}>{cate.name}</option>)}
            </select>
          </div>
        </div></Col>
        <Col lg={9}>
          <div className='Home-app'>
            <section className='home-interfaz'>

              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="search"
                  aria-label="search"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setSearch(e.target.value)}
                  value={inputsearch}
                />
                <Button onClick={() => dispa(filtersearch(inputsearch))} variant="outline-secondary" id="button-addon2">
                  <i className='bx bx-search-alt'></i>
                </Button>
              </InputGroup>
            </section>

            <section className='product-items'>
              <Row xs={1} lg={2} className="g-4">
                {products.map(prod => {
                  <Col>
                    <Link to={`/product/${prod.id}`}>

                      <Card>
                        <Card.Img classNme='item' variant="top" src={prod.productImgs[0]}
                 />
                        <Card.Body>
                          <Card.Title>{prod.title}</Card.Title>
                          <Card.Text>
                            {prod.category.name}
                            {prod.price}
                            <button className='buy-details'>Buy <i className='bx bxs-shopping-bags'></i></button>
                            <Button onClick={() => navig(`/product/${prod.id}`)} variant="primary"><i className='bx bx-shopping-bag'></i> More info</Button>
                          </Card.Text>
                        </Card.Body>

                      </Card> </Link>
                  </Col>
                })}
              </Row>
              {products.map(prod => {
                return (
                  <ul key={prod.id} className='item'>
                    <img src={prod.productImgs[0]} alt="" />
                    <li className='cat'> {prod.category.name}</li>
                    <li>{prod.title}</li>
                    <li className='price'>{prod.price}$</li>
                    <button className='buy-details'>Buy <i className='bx bxs-shopping-bags'></i></button>
                    <Button onClick={() => navig(`/product/${prod.id}`)} variant="primary"><i className='bx bx-shopping-bag'></i> More info</Button>
                  </ul>
                )
              })}
            </section></div> </Col>
      </Row>


    </>
  );

};


export default Home;