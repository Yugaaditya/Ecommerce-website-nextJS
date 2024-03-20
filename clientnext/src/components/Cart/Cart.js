import React, { useState, useEffect, useContext } from "react";
import CartCard from "../CartCard/CartCard";
import styles from "./cart.module.css"
import { useRouter } from 'next/router';
import { DarkModeContext } from "../../context/DarkModeContext";

export default function Cart() {

    let sum = 0;
    const theme = useContext(DarkModeContext)
    let token = ""
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    const router = useRouter();
    const [productItems, setProductItems] = useState(null);

    useEffect(() => {
        token=localStorage.getItem('token')
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await fetch(`http://localhost:4000/api/cart`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    });
                    if (response.ok) {
                        setProductItems(await response.json());
                    }
                    else if (localStorage.getItem('token')) {
                        localStorage.removeItem('token');
                        alert("Invalid token")
                        router.push("/login");

                    }
                }
                catch (error) {
                    console.log('Error:', error);
                }
            }
        }
        fetchData();
    }, [])

    if (productItems) {
        productItems.map((product, index) => (
            sum += product.price
        ))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ totalAmount: sum }),
            });
            if (response.ok) {
                const data = await response.json()
                alert(data.message)
                setProductItems([]);
            }
            else if (response.status === 404) {
                const errorData = await response.json();
                alert(errorData.message);
            }
            else if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
                alert("Invalid token")
                router.push("/login");
            }
        }
        catch (error) {
            console.log('Error:', error);
        }
    }

    let mainColour, cardColour, textColour;
    if (theme === "Light") {
        mainColour = { backgroundColor: "black", color: "white", height: "100vh", overflow: "auto" }
        cardColour = { backgroundColor: " rgba(48, 45, 48, 0.938)", boxShadow: "0px 0px 4px 4px rgba(192, 192, 192, 0.3)" }
        // textColour={color:"white"}
    }
    return (
        <div style={mainColour}>
            {(productItems !== null && productItems.length !== 0) ?
                <div className={styles["cart-page"]}>
                    {productItems.map((product, index) => (
                        <CartCard
                            productItems={productItems}
                            setProductItems={setProductItems}
                            key={index}
                            props={product}
                        />
                    ))}
                    <div className={styles["cart-summary"]}>
                        <h3 className={styles["total-amount"]}>Total Amount: {sum}</h3>
                        <button className={styles["place-order"]} onClick={handleClick}>Buy Now</button>
                    </div>
                </div> :
                <div className={styles["cart-items"]}>
                    Cart is Empty
                </div>}
        </div>
    );
}
