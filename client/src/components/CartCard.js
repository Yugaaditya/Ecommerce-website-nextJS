import React, { useContext } from "react";
import { FaTrash } from 'react-icons/fa';
import '../styles/cartCard.css';
import { jwtDecode } from 'jwt-decode';
import { productItems } from "../data/productItems";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";


export default function CartCard({ props, productItems, setProductItems }) {

  const theme = useContext(DarkModeContext)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  async function removeFromCart() {

    try {
      const response = await fetch(`http://localhost:4000/api/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ productId: props._id }),
      });
      setProductItems(
        productItems.filter(product => product._id !== props._id)
      )
      if (response.status == 200) {
        const data = await response.json();
        alert(data.message)
      }
      else if (response.status == 404) {
        const errorData = await response.json();
        alert(errorData.message);
      }
      else if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        alert("Invalid token")
        navigate("/login")
      }
    }
    catch (error) {
      console.log('Error:', error);
    }
  }
  return (
    <div className="cart-container">
      <img className="cart-product-iamge" src={props.image} alt={`${props.name} image`} />
      <div className="cart-item-details">
        <h2>{props.name}</h2>
        <p>Category: <i>{props.category}</i></p>
        <p>Price: <i>${props.price}</i></p>
      </div>
      <p className="remove-from-cart" onClick={removeFromCart}><FaTrash /></p>
    </div>
  )
}

