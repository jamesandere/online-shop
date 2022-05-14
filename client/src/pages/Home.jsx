import React from 'react';
import {useGetAllProductsQuery} from '../redux/productsApi';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    // const { data, error, isLoading } = useGetAllProductsQuery();
    const {items: data, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    }
  return (
    <div className="home-container">
        {status === "success" ? (
       <>
        <h2>New Arrivals</h2>
        <div className="products">
          {data?.map(product => 
            <div key={product._id} className="product">
              <h3>{product.name}</h3>
              <img src={product.image?.url} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
              </div>
              <button onClick={()=> handleAddToCart(product)}>Add To Cart</button>
            </div> )}  
        </div>     
      </> ): status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};


export default Home