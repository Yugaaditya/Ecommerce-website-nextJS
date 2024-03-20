import React, { useContext, useEffect, useState } from 'react';
import styles from './productItem.module.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { DarkModeContext } from '../../context/DarkModeContext';

const ProductItem = ({post}) => {
  const router = useRouter();
  //const { id } = router.query;
  const item=post
  const theme = useContext(DarkModeContext);

  async function handleAddToCart() {
    const token = localStorage.getItem('token');
    if (token) {
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
      alert("Sign in to add item to cart");
      router.push("/login");
    }
  }

  let mainColour, cardColour;
  if (theme === "Light") {
    mainColour = { backgroundColor: "black", color: "white", height: "100vh", overflow: "auto" };
    cardColour = { backgroundColor: "rgba(48, 45, 48, 0.938)", boxShadow: "0px 0px 4px 4px rgba(192, 192, 192, 0.3)" };
  }

  if (item) {
    const { name, category, description, price, rating, image } = item;
    return (
      <div className={styles["product-item"]} style={mainColour}>
        <div className={styles["product-item-box"]} style={cardColour}>
          <div className={styles["product-item-left"]}>
            <img src={image} alt={name} className={styles["product-item-image"]} />
            <button className={styles["add-to-cart-button"]} onClick={handleAddToCart}>Add to Cart <FaShoppingCart /></button>
          </div>
          <div className={styles["product-item-right"]}>
            <h2>{name}</h2>
            <p><b>Category:</b> <i>{category}</i></p>
            <p><b>Rating:</b> <i>{rating}</i></p>
            <p className={styles["text-description"]}>{description}</p>
            <p><b>Price:</b> <i>${price}</i></p>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className={styles["products-fetch"]} style={mainColour}>
        Fetching Products...
      </div>
    );
  }
}

export default ProductItem;
