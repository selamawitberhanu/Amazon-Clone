import React from 'react'
// import { Carousel } from 'react-responsive-carousel'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'
import LayOut from '../../Components/LayOut/LayOut'
import CarouselEffects from '../../Components/Carousel/Carousel'

function Landing() {
  return (
    <LayOut>
       <CarouselEffects/> 
       <Category/>
       <Product/>
    
    </LayOut>
  )
}

export default Landing