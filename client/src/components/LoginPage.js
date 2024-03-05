import React, { useContext, useState } from "react";
import '../styles/LoginPage.css';
import { redirect, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";


export default function LoginPage({ setLoginStatus }) {

    const theme = useContext(DarkModeContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.status == 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert(data.message);
                navigate("/home");
                setLoginStatus("Logout")
            } else if (response.status == 401) {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    let mainColour, cardColour, textColour;
    if (theme === "Light") {
        mainColour = { backgroundColor: "black", color: "white" }
        cardColour = { backgroundColor: " rgba(48, 45, 48, 0.938)", boxShadow: "0px 0px 4px 4px rgba(192, 192, 192, 0.3)" }
        // textColour={color:"white"}
    }
    return (
        <div className="login-container" style={mainColour}>
            <div className="login-form" style={cardColour}>
                <img className="login-form-image" src="/Logo.png" />
                <div className="login-text">
                    <h3 >Enter your login details</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="input-email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        className="input-password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

