import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from './pages/Landing/Landing'
import SignIn from './pages/Auth/Signup'
import Orders from './pages/Orders/Orders'
import Cart from './pages/Cart/Cart'
import Payment from './pages/Payment/Payment'
import Results from './pages/Results/Results'
import ProductDetail from './pages/ProductDetail/ProductDetail'


function Routing() {
  return (
   
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/auth" element={<SignIn />}/>
      <Route path="/payments" element={<Payment />}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/category/:categoryName" element={<Results/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/cart" element={<Cart/>}/>

      <Route path="/products/:productId" element={<ProductDetail />}/>


    </Routes>
   
  )
}

export default Routing