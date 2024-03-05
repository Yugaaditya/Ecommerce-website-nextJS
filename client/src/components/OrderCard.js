import React, { useContext } from "react";
import "../styles/orderCard.css"
import { DarkModeContext } from "../context/DarkModeContext";

export default function OrderCard({ props }) {

    const theme = useContext(DarkModeContext)
    return (
        <div className="order-container">
            <img className="order-product-image" src={props.image} alt={`${props.name} image`} />
            <h2>{props.name}</h2>
            <p className="order-price"><b>Price: </b><i>${props.price}</i></p>
        </div>
    )
}