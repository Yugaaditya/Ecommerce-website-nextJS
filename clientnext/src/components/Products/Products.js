import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from "./Products.module.css"
import { useRouter } from 'next/router';
import { DarkModeContext } from '../../context/DarkModeContext';

const ProductsPage = ({ sortType, rating, category, search }) => {
    console.log(sortType)
    const theme = useContext(DarkModeContext);
    const router = useRouter();
    let token = "";
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    const [productItems, setProductItems] = useState(null);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await fetch('https://ecommerce-website-next-js-theta.vercel.app//api/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sortOption: sortType, ratingOption: rating, categoryOption: category, searchWord: search }),
                });
                if (response.ok) {
                    setProductItems(await response.json());
                }
            }
            catch (error) {
                console.log('Error:', error);
            }
        };

        const fetchCartData = async () => {
            if (token) {
                try {
                    const response = await fetch(`https://ecommerce-website-next-js-theta.vercel.app//api/cart`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                    });
                    if (response.status === 200) {
                        const data = await response.json();
                        setCartData(data.map((product) => product._id))
                    }
                    else if (response.status === 404) {
                        const errorData = await response.json();
                        alert(errorData.message);
                    }
                    else if (localStorage.getItem('token')) {
                        router.push("/home")
                    }
                }
                catch (error) {
                    console.log('Error:', error);
                }
            }
        };

        const fetchDataAndCartData = async () => {
            await fetchCartData();
            await fetchData();
        };

        fetchDataAndCartData();
    }, [sortType, rating, category, search])

    const handleClick = (id) => {
        router.push(`/product/${id}`)
    }

    let mainColour, cardColour;
    if (theme === "Light") {
        mainColour = { backgroundColor: "black", color: "white", height: "100vh", overflow: "auto" }
        cardColour = { backgroundColor: " rgba(48, 45, 48, 0.938)", boxShadow: "0px 0px 4px 4px rgba(192, 192, 192, 0.3)" }
    }

    return (
        <div style={mainColour}>
            {(productItems) ?
                (
                    <div className={styles["products-page"]} >
                        {productItems.map((product, index) => (
                            <ProductCard
                                onClick={() => handleClick(product._id)}
                                key={index}
                                item={product}
                                cartData={cartData}
                            />
                        ))}
                    </div>
                ) :
                <div className={styles["products-fetch"]} style={mainColour}>
                    Fetching Products...
                </div>
            }
        </div>
    );
};

export default ProductsPage;
