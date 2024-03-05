import React, { useContext, useEffect, useState } from "react";
import "../styles/order.css"
import OrderNumber from "../components/OrderNumber";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Order() {

    const theme = useContext(DarkModeContext)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [productItems, setProductItems] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                if (response.ok) {
                    const data = await response.json()
                    setProductItems(data)
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
        fetchData()
    }, [])

    let mainColour, cardColour, textColour;
    if (theme === "Light") {
        mainColour = { backgroundColor: "black", color: "white", height: "100vh", overflow: "auto" }
    }
    return (
        <div style={mainColour}>
            {(productItems.length !== 0) ?
                <div className="order-page" style={mainColour}>
                    {productItems.map((product, index) => (
                        <OrderNumber
                            key={index}
                            products={product.products}
                            totalAmount={product.totalAmount}
                            id={index + 1}
                        />
                    ))}
                </div>
                :
                <div className="order-items">
                    No Orders
                </div>}
        </div>
    );

}
