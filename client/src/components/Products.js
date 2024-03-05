import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
// import { productItems } from '../data/productItems'; 
import "../styles/Products.css"
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from '../context/DarkModeContext';

const ProductsPage = ({ sortType, rating, category, search }) => {

    const theme = useContext(DarkModeContext)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [productItems, setProductItems] = useState(null);
    const [cartData, setCartData] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/product', {
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
        }

        const fetchCartData = async () => {
            if (token) {
                try {
                    // const decodedToken = jwtDecode(token);
                    // const userId = decodedToken._id;
                    const response = await fetch(`http://localhost:4000/api/cart`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                    });
                    if (response.status == 200) {
                        const data = await response.json();
                        setCartData(data.map((product) => product._id))
                    }
                    else if (response.status == 404) {
                        const errorData = await response.json();
                        alert(errorData.message);
                    }
                    else if (localStorage.getItem('token')) {
                        navigate("/home")
                    }
                }
                catch (error) {
                    console.log('Error:', error);
                }
            }

        }
        const fetchDataAndCartData = async () => {
            await fetchCartData();
            await fetchData();
        };

        fetchDataAndCartData();
    }, [sortType, rating, category, search])


    // console.log(productItems)
    const handleClick = (id) => {
        navigate(`/product/${id}`)
    }
    let mainColour, cardColour, textColour;
    if (theme === "Light") {
        mainColour = { backgroundColor: "black", color: "white", height: "100vh", overflow: "auto" }
        cardColour = { backgroundColor: " rgba(48, 45, 48, 0.938)", boxShadow: "0px 0px 4px 4px rgba(192, 192, 192, 0.3)" }
        // textColour={color:"white"}
    }
    return (
        <div style={mainColour}>
            {(productItems) ?
                (<div className="products-page" >
                    {productItems.map((product, index) => (
                        <ProductCard
                            onClick={() => handleClick(product._id)}
                            key={index}
                            item={product}
                            cartData={cartData}
                        />
                    ))}
                </div>) :
                <div className='products-fetch' style={mainColour}>
                    Fetching Products...
                </div>}
        </div>
    );
};

export default ProductsPage;
