import React, { useEffect, useState } from 'react';
import classes from './ProductDetail.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { productUrl } from '../../Api/endPoints';
import Loader from '../../Components/Loader/Loader';
import LayOut from '../../Components/LayOut/LayOut';
import ProductCard from '../../Components/Product/ProductCard';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, []);

  return (
    <LayOut>
      {isLoading? (<Loader/>):
      (<ProductCard
      product= {product}
      flex ={true}
      renderDesc={true}
      renderAdd={true}
      />)}
    </LayOut>
  );
}

export default ProductDetail;
