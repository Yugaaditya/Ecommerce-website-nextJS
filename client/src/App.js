import './App.css';
import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import ProductsPage from './components/Products'
import ProductItem from './components/productItem';
import Cart from './components/Cart';
import Order from './components/Order';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useReducer, useState } from 'react';
import { DarkModeContext } from './context/DarkModeContext';
import ThemeReducer from './reducer/ThemeReducer';


function App() {
  const [LoginStatus, setLoginStatus] = useState((localStorage.getItem("token")) ? "Logout" : "Login");
  const [sortType, setSorting] = useState(null);
  const [rating, setRating] = useState(null)
  const [category, setCategory] = useState(null)
  const [search, setSearch] = useState("")
  const [theme, dispatch] = useReducer(ThemeReducer, "Dark")

  return (
    <DarkModeContext.Provider value={theme}>
      <div>
        <Navbar LoginStatus={LoginStatus} setLoginStatus={setLoginStatus} setSorting={setSorting} setRating={setRating} setCategory={setCategory} search={search} setSearch={setSearch} theme={theme} dispatch={dispatch} />
        <Routes>
          <Route path='/login' element={<LoginPage setLoginStatus={setLoginStatus} />} />
          <Route path='/home' element={<ProductsPage sortType={sortType} rating={rating} category={category} search={search} />} />
          <Route path='/product/:id' element={<ProductItem />} />
          <Route path='/cart' element={localStorage.getItem('token') ? <Cart /> : <Navigate to="/login" />} />
          <Route path='/orders' element={localStorage.getItem('token') ? <Order /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
