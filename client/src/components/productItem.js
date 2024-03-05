import React, { useContext, useEffect, useState } from 'react';
import '../styles/productItem.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { DarkModeContext } from '../context/DarkModeContext';

const ProductItem = () => {


  const { id } = useParams();
  const [item, setItem] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const theme = useContext(DarkModeContext)

  async function handleAddToCart() {
    if (token) {
      // const decodedToken = jwtDecode(token);
      // const userId = decodedToken._id;  
      try {
        const response = await fetch(`http://localhost:4000/api/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ productId: item._id }),
        });
        if (response.status == 200) {
          const data = await response.json();
          alert(data.message)
        }
        else if (response.status == 404) {
          const errorData = await response.json();
          alert(errorData.error);
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
    else {
      alert("Sign in to add item to cart")
      navigate("/login")
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/product/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const productData = await response.json();
          setItem(productData);
        } else if (response.status === 404) {
          const errorData = await response.json();
          alert(errorData.error);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchProduct();
  }, [id]);
  // console.log(item)
  let mainColour, cardColour, textColour;
  if (theme === "Light") {
    mainColour = { backgroundColor: "black", color: "white", height: "100vh", overflow: "auto" }
    cardColour = { backgroundColor: " rgba(48, 45, 48, 0.938)", boxShadow: "0px 0px 4px 4px rgba(192, 192, 192, 0.3)" }
    // textColour={color:"white"}
  }

  if (item) {
    const { name, category, description, price, rating, image } = item;
    return (
      <div className="product-item" style={mainColour}>
        <div className="product-item-box" style={cardColour}>
          <div className="product-item-left">
            <img src={image} alt={name} className="product-item-image" />
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart  <FaShoppingCart /> <i className="fas fa-shopping-cart"></i></button>
          </div>
          <div className="product-item-right">
            <h2>{name}</h2>
            <p><b>Category:</b> <i>{category}</i></p>
            <p><b>Rating:</b> <i>{rating}</i></p>
            <p className='text-description'>{description}</p>
            <p><b>Price:</b> <i>${price}</i></p>
          </div>
        </div>
      </div>)
  }
  else {
    return (
      <div className='products-fetch' style={mainColour}>
        Fetching Products...
      </div>
    )
  }
}
export default ProductItem;
