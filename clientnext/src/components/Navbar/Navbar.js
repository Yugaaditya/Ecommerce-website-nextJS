import React, { useState, useReducer, useContext, useEffect } from "react"
import styles from "./navbar.module.css"
import { useRouter } from 'next/router';
import { DarkModeContext } from "../../context/DarkModeContext";
import Link from "next/link";

export default function Navbar({ LoginStatus, setLoginStatus, setSorting, setRating, setCategory, search, setSearch, dispatch }) {
    const router = useRouter();
    const theme = useContext(DarkModeContext)
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
  
    function handleLogout() {
        if (localStorage.getItem("token")) {
            localStorage.removeItem('token');
        }
        if (LoginStatus === "Logout") {
            setLoginStatus('Login')
        }
        router.push("/login")
        setSorting(null)
        setRating(null)
        setCategory(null)
    }

    function handleCart() {
        router.push("/cart")
    }

    function handleOrders() {
        router.push("/orders")
    }

    function handleHome() {
        router.push("/home")
    }

    function handleSort(sortType) {
        setSorting(sortType)
    }

    function handleRating(rating) {
        setRating(rating)
    }

    function handleCategory(category) {
        setCategory(category)
    }

    function handleReset() {
        setSorting(null)
        setRating(null)
        setCategory(null)
    }

    function handleSearchChange(event) {
        setSearch(event.target.value)
    }

    function handleSearch(e) {
        e.preventDefault()
    }

    function handleTheme(mode) {
        dispatch({
            type: "toggle"
        });
    }
    let mainColour, cardColour, textColour, navBar;
    if (theme === "Light") {
        mainColour = { color: "rgba(255,255,255,0.6)" }
        //navBar= {padding: "0px"}
    }
    if (!mounted) return <></>;
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme={`${theme === "Light" ? "dark" : "light"}`} >
            <div className="container-fluid" style={mainColour}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <p className={styles["home-icon"]} onClick={handleHome} >Home</p>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Rating
                            </Link >
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" onClick={() => handleRating(4)}>Rating: <b>4⭐- 5⭐</b></Link ></li>
                                <li><Link className="dropdown-item" onClick={() => handleRating(3)}>Rating: <b>3⭐- 4⭐</b></Link ></li>
                                <li><Link className="dropdown-item" onClick={() => handleRating(2)}>Rating: <b>2⭐- 3⭐</b></Link ></li>
                                <li><Link className="dropdown-item" onClick={() => handleRating(1)}>Rating: <b>1⭐- 2⭐</b></Link ></li>
                                {/* <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" href="#">Something else here</Link ></li> */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort By
                            </Link >
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" onClick={() => handleSort('priceLowToHigh')}>Price: low to high</Link ></li>
                                <li><Link className="dropdown-item" onClick={() => handleSort('priceHighToLow')}>Price: high to low</Link ></li>
                                <li><Link className="dropdown-item" onClick={() => handleSort('ratingHighToLow')}>Rating: high to low</Link ></li>
                                {/* <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" href="#">Something else here</Link ></li> */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </Link >
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" onClick={() => { handleCategory("fragrances") }}>fragrances</Link ></li>
                                <li><Link className="dropdown-item" onClick={() => { handleCategory("groceries") }}>groceries</Link ></li>
                                <li><Link className="dropdown-item" onClick={() => { handleCategory("home-decoration") }}>home-decoration</Link ></li>
                                <li><Link className="dropdown-item" onClick={() => { handleCategory("laptops") }}>laptops</Link ></li>
                                <li><Link className="dropdown-item" onClick={() => { handleCategory("skincare") }}>skincare</Link ></li>
                                <li><Link className="dropdown-item" onClick={() => { handleCategory("smartphones") }}>smartphones</Link ></li>
                                {/* <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" href="#">Something else here</Link ></li> */}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => { handleReset() }} className="btn btn-success mx-2" >Reset Filter</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-success mx-2" >{LoginStatus}</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleCart} className="btn btn-success mx-2" >Cart</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleOrders} className="btn btn-success mx-2" >Orders</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => handleTheme(theme)} className="btn btn-success mx-2" >{`${theme} mode`}</button>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange} value={search} />
                        <button className="btn btn-outline-success" onClick={handleSearch} type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}