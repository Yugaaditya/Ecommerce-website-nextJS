import React, { useContext, useEffect, useState } from 'react';
import styles from './productCard.module.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { DarkModeContext } from '../../context/DarkModeContext';

const ProductCard = ({ onClick, item, cartData }) => {
  const theme = useContext(DarkModeContext);
  const [colour, setNewColour] = useState(theme === "Light" ? 'white' : "black");
  let token=""
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  const router = useRouter();

  useEffect(() => {
    if (colour !== "red") {
      setNewColour(theme === "Light" ? 'white' : "black");
    }
  }, [theme]);

  useEffect(() => {
    token = localStorage.getItem('token');
    if (cartData.includes(item._id)) {
      setNewColour("red");
    }
  }, []);

  async function handleOnClick(event) {
    event.stopPropagation();
    const iconColour = theme === "Light" ? 'white' : "black";
    if (token) {
      setNewColour(colour === iconColour ? "red" : iconColour);
      if (colour === iconColour) {
        try {
          const response = await fetch(`https://ecommerce-website-next-js-theta.vercel.app/api/cart/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({ productId: item._id }),
          });
          if (response.status === 200) {
            const data = await response.json();
            alert(data.message);
          }
          else if (response.status === 404) {
            const errorData = await response.json();
            alert(errorData.error);
          }
          else if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            alert("Invalid token");
            router.push("/login");
          }
        }
        catch (error) {
          console.log('Error:', error);
        }
      }
      else {
        try {
          const response = await fetch(`https://ecommerce-website-next-js-theta.vercel.app/api/cart/remove`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({ productId: item._id }),
          });
          if (response.status === 200) {
            const data = await response.json();
            alert(data.message);
          }
          else if (response.status === 404) {
            const errorData = await response.json();
            alert(errorData.message);
          }
          else if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            alert("Invalid token");
            router.push("/login");
          }
        }
        catch (error) {
          console.log('Error:', error);
        }
      }
    }
    else {
      alert("Sign in to add to cart");
      router.push('/login');
    }
  }

  let mainColour, cardColour, ratingColour;
  if (theme === "Light") {
    mainColour = { backgroundColor: "black", color: "white" };
    cardColour = { backgroundColor: "rgba(48, 45, 48, 0.938)", boxShadow: "0px 0px 4px 4px rgba(192, 192, 192, 0.3)" };
    ratingColour = { backgroundColor: "#2a472f" };
  }

  return (
    <div onClick={onClick} className={styles["product-card"]} style={cardColour}>
      <div className={styles["product-image-container"]}>
        <img src={item.image} alt="Product" className={styles["product-image"]} />
        <div className={styles["product-rating"]} style={ratingColour}>{item.rating} <span role="img" aria-label="star">⭐</span></div>
      </div>
      <div className={styles["product-details"]}>
        <div className={styles["product-name"]}>{item.name}</div>
        <div className={styles["product-category"]}>{item.category}</div>
        <div className={styles["product-price-container"]}>
          <div className={styles["product-price"]}>${item.price}</div>
          <p className={styles["add-to-cart"]} onClick={handleOnClick}><FaShoppingCart style={{ color: colour }} /></p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
