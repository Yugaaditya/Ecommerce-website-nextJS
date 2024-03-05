import React, { useContext, useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import "../styles/orderNumber.css"
import { DarkModeContext } from "../context/DarkModeContext";

export default function OrderNumber({ products, totalAmount, id }) {

    const theme = useContext(DarkModeContext)
    return (
        <div>
            <div className="order-number">
                <h2 className="order-number-id">{`Order - ${id}`}</h2>
            </div>
            <div className="order-number-container">
                {products.map((product, index) => (
                    <OrderCard
                        key={index}
                        props={product}
                    />
                ))}
                <div className="total-amount-container">
                    <h3 className="total-amount">Total Amount</h3>
                    <h3 className="total-amount-sum">${totalAmount}</h3>
                </div>
            </div>
        </div>
    )
}